// Dify API Client Script

class DifyAPIClient {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedConfig();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Form submission
        const form = document.getElementById('imageForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // File upload area
        const fileUploadArea = document.getElementById('fileUploadArea');
        const inputImage = document.getElementById('inputImage');

        fileUploadArea.addEventListener('click', () => inputImage.click());
        inputImage.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });

        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                inputImage.files = files;
                this.handleFileSelect({ target: { files } });
            }
        });

        // Remove image
        const removeBtn = document.getElementById('removeImage');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeImage();
        });

        // Prompt character count
        const prompt = document.getElementById('prompt');
        prompt.addEventListener('input', (e) => {
            const count = e.target.value.length;
            document.getElementById('promptCount').textContent = count;
            if (count > 1000) {
                e.target.value = e.target.value.substring(0, 1000);
            }
        });

        // Save API config
        const apiKey = document.getElementById('apiKey');
        const apiEndpoint = document.getElementById('apiEndpoint');

        apiKey.addEventListener('change', () => this.saveConfig());
        apiEndpoint.addEventListener('change', () => this.saveConfig());
    }

    // Handle file selection
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('请选择图片文件');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('图片大小不能超过 10MB');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImg = document.getElementById('previewImg');
            previewImg.src = e.target.result;

            document.querySelector('.upload-placeholder').style.display = 'none';
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Remove uploaded image
    removeImage() {
        const inputImage = document.getElementById('inputImage');
        inputImage.value = '';

        document.querySelector('.upload-placeholder').style.display = 'block';
        document.getElementById('imagePreview').style.display = 'none';
    }

    // Save configuration to localStorage
    saveConfig() {
        const config = {
            apiKey: document.getElementById('apiKey').value,
            apiEndpoint: document.getElementById('apiEndpoint').value
        };
        localStorage.setItem('dify_config', JSON.stringify(config));
    }

    // Load saved configuration
    loadSavedConfig() {
        const savedConfig = localStorage.getItem('dify_config');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            document.getElementById('apiKey').value = config.apiKey || '';
            document.getElementById('apiEndpoint').value = config.apiEndpoint || 'https://api.dify.ai/v1/chat-messages';
        }
    }

    // Handle form submission
    async handleSubmit(event) {
        event.preventDefault();

        // Validate file upload
        const inputImage = document.getElementById('inputImage');
        if (!inputImage.files || inputImage.files.length === 0) {
            alert('请先上传图片！');
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Disable submit button
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';

        try {
            // Get form data
            const formData = this.getFormData();

            // Validate API key
            if (!formData.apiKey) {
                throw new Error('请输入 API Key');
            }

            // Make API call
            const result = await this.callDifyAPI(formData);

            // Display result
            this.displayResult(result);

        } catch (error) {
            this.displayError(error.message);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    // Get form data
    getFormData() {
        const inputImage = document.getElementById('inputImage').files[0];
        const prompt = document.getElementById('prompt').value;
        const size = document.getElementById('size').value;
        const aspectRatio = document.getElementById('aspectRatio').value;
        const userQuery = document.getElementById('userQuery').value;
        const userFiles = document.getElementById('userFiles').files;
        const apiKey = document.getElementById('apiKey').value;
        const apiEndpoint = document.getElementById('apiEndpoint').value;

        return {
            apiKey,
            apiEndpoint,
            inputImage,
            prompt,
            size,
            aspectRatio,
            userQuery,
            userFiles
        };
    }

    // Call Dify API
    async callDifyAPI(formData) {
        try {
            // First, upload the image file
            const uploadedFile = await this.uploadFile(formData.inputImage, formData.apiKey);

            // Prepare the inputs object for the workflow
            // Based on API errors: must be a list of files, but only accepts one file
            // So we need an array with exactly one file object
            const inputs = {
                inputimage: [{
                    type: 'image',
                    transfer_method: 'local_file',
                    upload_file_id: uploadedFile.id
                }],
                prompt: formData.prompt,
                size: formData.size
            };

            // Add optional parameters
            if (formData.aspectRatio) {
                inputs.aspect_ratio = formData.aspectRatio;
            }

            // Prepare user input if provided
            const userinput = {};
            if (formData.userQuery) {
                userinput.query = formData.userQuery;
            }
            if (formData.userFiles && formData.userFiles.length > 0) {
                // Upload additional files
                const additionalFiles = await Promise.all(
                    Array.from(formData.userFiles).map(file =>
                        this.uploadFile(file, formData.apiKey)
                    )
                );
                userinput.files = additionalFiles.map(f => f.id);
            }

            if (Object.keys(userinput).length > 0) {
                inputs.userinput = userinput;
            }

            // Make the workflow call
            const requestBody = {
                query: formData.prompt,  // Required: chat query
                inputs: inputs,
                response_mode: 'blocking',
                user: 'user-' + Date.now()
            };

            console.log('发送请求:', {
                url: formData.apiEndpoint,
                body: requestBody
            });

            const response = await fetch(formData.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${formData.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Get response text first
            const responseText = await response.text();
            console.log('API 响应状态:', response.status);
            console.log('API 响应内容:', responseText);

            if (!response.ok) {
                let errorData;
                try {
                    errorData = JSON.parse(responseText);
                } catch (e) {
                    errorData = { message: responseText };
                }

                // Throw detailed error
                const error = new Error(errorData.message || `API 请求失败`);
                error.status = response.status;
                error.statusText = response.statusText;
                error.details = errorData;
                error.requestBody = requestBody;
                throw error;
            }

            return JSON.parse(responseText);
        } catch (error) {
            // Re-throw with additional context
            if (!error.requestBody) {
                error.requestBody = {
                    inputs: {
                        prompt: formData.prompt,
                        size: formData.size,
                        aspect_ratio: formData.aspectRatio
                    }
                };
            }
            throw error;
        }
    }

    // Upload file to Dify
    async uploadFile(file, apiKey) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user', 'user-' + Date.now());

        const response = await fetch('https://api.dify.ai/v1/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`文件上传失败: ${errorData.message || response.status}`);
        }

        return await response.json();
    }

    // Display result
    displayResult(result) {
        const resultSection = document.getElementById('resultSection');
        const resultContent = document.getElementById('resultContent');

        // Clear previous results
        resultContent.innerHTML = '';

        // Create detailed result display
        let html = '<div class="result-wrapper">';

        // Success header
        html += '<div class="result-header">';
        html += '<h3>✅ API 调用成功</h3>';
        html += `<p class="timestamp">时间：${new Date().toLocaleString('zh-CN')}</p>`;
        html += '</div>';

        // Extract image URL from various possible locations in the response
        let imageUrl = null;

        // Log the full result for debugging
        console.log('完整 API 响应:', result);

        // Check multiple possible locations for image URL
        if (result.data && result.data.outputs) {
            const outputs = result.data.outputs;
            console.log('检查 data.outputs:', outputs);

            // Try different possible field names
            imageUrl = outputs.image_url || outputs.imageUrl || outputs.image || outputs.output_image || outputs.result;
        }

        // Check if answer contains URL (some workflows return URL in answer)
        if (!imageUrl && result.answer) {
            console.log('检查 answer:', result.answer);
            // Check if answer is a URL
            if (typeof result.answer === 'string' && (result.answer.startsWith('http://') || result.answer.startsWith('https://'))) {
                imageUrl = result.answer;
            }
        }

        // Check metadata or other fields
        if (!imageUrl && result.metadata && result.metadata.outputs) {
            console.log('检查 metadata.outputs:', result.metadata.outputs);
            imageUrl = result.metadata.outputs.image_url || result.metadata.outputs.image;
        }

        // Try to find any URL in the response that looks like an image
        if (!imageUrl) {
            const jsonStr = JSON.stringify(result);
            const urlMatch = jsonStr.match(/(https?:\/\/[^\s"]+\.(jpg|jpeg|png|gif|webp|svg))/i);
            if (urlMatch) {
                imageUrl = urlMatch[1];
                console.log('从响应中提取到图片 URL:', imageUrl);
            }
        }

        console.log('最终提取到的图片 URL:', imageUrl);

        // Display image if found
        if (imageUrl) {
            html += '<div class="image-result">';
            html += '<h4>🖼️ 生成的图片</h4>';
            html += `<img src="${imageUrl}" alt="Generated Image" class="result-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">`;
            html += `<p style="display:none; color: #f87171;">图片加载失败，请检查 URL：<a href="${imageUrl}" target="_blank" style="color: #60a5fa;">${imageUrl}</a></p>`;
            html += `<a href="${imageUrl}" target="_blank" class="download-btn">在新窗口打开图片</a>`;
            html += '</div>';
        } else {
            // No image found, show a notice
            html += '<div class="image-result" style="background: rgba(251, 191, 36, 0.1); border-color: rgba(251, 191, 36, 0.3);">';
            html += '<h4>⚠️ 未找到图片 URL</h4>';
            html += '<p style="color: #fbbf24;">API 返回成功，但未在响应中找到图片 URL。请检查下方的完整 API 响应。</p>';
            html += '</div>';
        }

        // Complete API Response (Debugging)
        html += '<div class="debug-section">';
        html += '<div class="debug-header" onclick="this.parentElement.classList.toggle(\'expanded\')">';
        html += '<h4>🔍 完整 API 响应 (调试信息)</h4>';
        html += '<span class="toggle-icon">▼</span>';
        html += '</div>';
        html += '<div class="debug-content">';
        html += '<pre class="json-display">' + JSON.stringify(result, null, 2) + '</pre>';
        html += '<button class="copy-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">复制 JSON</button>';
        html += '</div>';
        html += '</div>';

        // Request details
        const requestDetails = {
            method: 'POST',
            endpoint: document.getElementById('apiEndpoint').value,
            timestamp: new Date().toISOString(),
            inputs: {
                prompt: document.getElementById('prompt').value,
                size: document.getElementById('size').value,
                aspect_ratio: document.getElementById('aspectRatio').value || '自动'
            }
        };

        html += '<div class="debug-section">';
        html += '<div class="debug-header" onclick="this.parentElement.classList.toggle(\'expanded\')">';
        html += '<h4>📤 请求参数</h4>';
        html += '<span class="toggle-icon">▼</span>';
        html += '</div>';
        html += '<div class="debug-content">';
        html += '<pre class="json-display">' + JSON.stringify(requestDetails, null, 2) + '</pre>';
        html += '</div>';
        html += '</div>';

        html += '</div>';

        resultContent.innerHTML = html;

        // Show result section
        resultSection.style.display = 'block';

        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Display error
    displayError(error) {
        const resultSection = document.getElementById('resultSection');
        const resultContent = document.getElementById('resultContent');

        console.error('错误详情:', error);

        let html = '<div class="error-wrapper">';

        // Error header
        html += '<div class="error-header">';
        html += '<h3>❌ 请求失败</h3>';
        html += `<p class="timestamp">时间：${new Date().toLocaleString('zh-CN')}</p>`;
        html += '</div>';

        // Main error message
        html += '<div class="error-main">';
        html += `<p class="error-message-text"><strong>错误信息：</strong>${error.message}</p>`;

        // HTTP Status if available
        if (error.status) {
            html += `<p class="error-status"><strong>HTTP 状态码：</strong>${error.status} ${error.statusText || ''}</p>`;
        }
        html += '</div>';

        // Error Details (Collapsible)
        if (error.details) {
            html += '<div class="debug-section expanded">';
            html += '<div class="debug-header" onclick="this.parentElement.classList.toggle(\'expanded\')">';
            html += '<h4>🔍 详细错误信息</h4>';
            html += '<span class="toggle-icon">▼</span>';
            html += '</div>';
            html += '<div class="debug-content">';
            html += '<pre class="json-display error-json">' + JSON.stringify(error.details, null, 2) + '</pre>';
            html += '<button class="copy-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">复制错误信息</button>';
            html += '</div>';
            html += '</div>';
        }

        // Request Body (Collapsible)
        if (error.requestBody) {
            html += '<div class="debug-section expanded">';
            html += '<div class="debug-header" onclick="this.parentElement.classList.toggle(\'expanded\')">';
            html += '<h4>📤 发送的请求数据</h4>';
            html += '<span class="toggle-icon">▼</span>';
            html += '</div>';
            html += '<div class="debug-content">';
            html += '<pre class="json-display">' + JSON.stringify(error.requestBody, null, 2) + '</pre>';
            html += '<button class="copy-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">复制请求数据</button>';
            html += '</div>';
            html += '</div>';
        }

        // Troubleshooting tips
        html += '<div class="error-tips">';
        html += '<h4>💡 排查建议</h4>';
        html += '<ul>';
        html += '<li>检查 <strong>API Key</strong> 是否正确</li>';
        html += '<li>确认 <strong>API Endpoint</strong> 地址是否正确</li>';
        html += '<li>验证所有 <strong>必填参数</strong> 是否已填写</li>';
        html += '<li>检查参数格式是否符合 API 要求（如 size: 1K/2K/4K）</li>';
        html += '<li>查看浏览器控制台（F12）获取更多调试信息</li>';
        html += '<li>如果是 "Input payload validation failed"，请检查输入参数的格式和类型</li>';
        html += '</ul>';
        html += '</div>';

        html += '</div>';

        resultContent.innerHTML = html;

        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DifyAPIClient();
});
