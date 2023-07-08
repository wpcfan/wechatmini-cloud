const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const apiBaseUrl = '';
  const apiKey = '';
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

  // mod.cjs
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  
  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    console.log('Response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
  
};
