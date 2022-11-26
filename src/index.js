import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';  // 性能监控
import fastclick from 'fastclick';

// 解决移动端点击300毫秒延迟
fastclick.attach(document.body) 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render();

reportWebVitals(console.log);
