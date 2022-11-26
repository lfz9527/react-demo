import React, { Component } from 'react';
import PublicHeader from "../../components/header/header";
import { is, fromJS } from 'immutable';
import './helpcenter.less';

export default class HelpCenter extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render(){
    return (
      <main>
        <PublicHeader title="帮助中心" record />
        <article className="context-con">
          <h2>介绍</h2>
          <p>本项目主要用于理解 react 和 redux 的编译方式，以及 react + redux 之间的配合方式</p>
          <h2>技术要点</h2>
          <p>react：v18.2.0</p>
          <p>react-redux：v8.0.5</p>
          <p>redux：v4.2.0</p>
          <p>webpack：v5.64.4</p>
          <p>react-router-dom：v5.3.4</p>
          <p>ES 6/7/8</p>
          <p>axios：v0.17</p>
          <p>less：v2.7</p>
          <p>immutable：^4.1.0</p>
          <p>redux-thunk: 2.4.2</p>

        </article>
      </main>
    )
  }
}