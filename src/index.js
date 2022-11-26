import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';  // 性能监控
import fastclick from 'fastclick';
import { Provider } from 'react-redux';
import Route from './router'
import store from './store/store';
import './style/base.css';
import './utils/setRem'

// 解决移动端点击300毫秒延迟
fastclick.attach(document.body) 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <Route/>
  </Provider>
);

reportWebVitals(console.log);
