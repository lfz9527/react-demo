import React, { Component } from "react";

// 组件异步加载 解决初始化页面加载慢，所以按需加载。
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props){
            super(props)
            this.state = {
                component: null
              };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();
      
            this.setState({component});
          }

          render() {
            const C = this.state.component;
      
            return C ? <C {...this.props} /> : null;
          }
    }

  return AsyncComponent
}
