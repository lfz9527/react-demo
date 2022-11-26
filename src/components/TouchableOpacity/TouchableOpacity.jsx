import React, { Component } from 'react'
import protoType from 'prop-types';
import { is, fromJS } from 'immutable';

export default class TouchableOpacity extends Component {

    btn = React.createRef()

    handleTouchStart = () => {
        this.btn.current.style.opacity = '0.3';
    }

    handleTouchEnd = () => {
        this.btn.current.style.opacity = '1';
        this.props.clickCallBack();
    }

    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
      }
    
    
  render() {
    return (
      <div className={`btn-con ${this.props.className}`}  onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} ref={this.btn} >{this.props.text || '确认'}</div>
    )
  }
}


TouchableOpacity.protoType = {
    clickCallBack: protoType.func,
    text: protoType.string,
    className: protoType.string,
}