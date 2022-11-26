import React, { Component } from 'react'
import { is, fromJS } from 'immutable';
import axios  from 'axios';
import './recordList.less';

class recordList extends Component {
  state={
    recordData: [],
  }

    /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  getRecord = type =>{
    /* eslint-disable */
    switch (type) {
      case 'passed':
        axios.get('http://localhost:3000/passed.json').then(res=>{
          console.log('res==>',res);
          this.setState({recordData: res.data.data||[]})
        })
        break;
      case 'audited':
        axios.get('http://localhost:3000/audited.json').then(res=>{
          this.setState({recordData: res.data.data||[]})
        })
        break;
      case 'failed':
        axios.get('http://localhost:3000/failed.json').then(res=>{
          this.setState({recordData: res.data.data||[]})
        })
        break;
      default:
        axios.get('http://localhost:3000/passed.json').then(res=>{
          this.setState({recordData: res.data.data||[]})
        })
        break;
    }
  }

  componentWillReceiveProps(nextProps){
    // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[2];
    let type = nextProps.location.pathname.split('/')[2];
    if(currenType !== type){
      this.getRecord(type);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillMount(){
    let type = this.props.location.pathname.split('/')[2];
    this.getRecord(type);
  }

  render() {
    return (
      <div>
        <ul className="record-list-con">
        {
          this.state.recordData.map((item, index) => {
            return <li className="record-item" key={index}>
              <section className="record-item-header">
                <span>创建时间：{item.created_at}</span>
                <span>{item.type_name}</span>
              </section>
              <section className="record-item-content">
                <p><span>用户名：</span>{item.customers_name} &emsp; {item.customers_phone}</p>
                <p><span>商&emsp;品：</span>{item.product[0].product_name}</p>
                <p><span>金&emsp;额：</span>{item.sales_money} &emsp; 佣金：{item.commission}</p>
              </section>
              <p className="record-item-footer">等待管理员审核，审核通过后，佣金将结算至账户</p>
            </li>
          })
        }
        </ul>
      </div>
    )
  }
}


export default recordList