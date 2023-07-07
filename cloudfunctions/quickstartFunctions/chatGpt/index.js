const cloud = require('wx-server-sdk');
import fetch from 'node-fetch';

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const apiBaseUrl = 'https://twigai.openai.azure.com/openai/deployments/twigchat35';
  const apiKey = '07ff0fae445c4dafa549d9283781da0d';
  const query = {
    // 添加其他查询参数
    'api-version': '2023-03-15-preview'
  };

  const queryString = new URLSearchParams(query).toString();
  const apiUrl = `${apiBaseUrl}/chat/completions`
  const url = `${apiUrl}?${queryString}`;

  const postData = {
    // 根据需要添加请求的数据
    messages: [
      {
        role: 'system',
        content: 'Translate English to Chinese: ' + event.content
      }
    ]
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    console.log('Response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
  
};
