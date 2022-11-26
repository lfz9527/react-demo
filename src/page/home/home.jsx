import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { is, fromJS } from 'immutable';
import PublicHeader from '../../components/header/header'
import TouchableOpacity from '../../components/TouchableOpacity/TouchableOpacity';
import PublicAlert from '../../components/alert/alert'
import { saveFormData, saveImg, clearData } from '../../store/home/action';
import { clearSelected } from '../../store/production/action';
import propTypes from 'prop-types';
import './home.less'
import { connect } from 'react-redux';


class Home extends Component {
  state = {
    alertStatus: false, // 弹窗状态
    alertTip: '' , // 弹框提示文字
  }

    // 关闭弹幕
    closeAlert = () => {
      this.setState({
        alertStatus: false,
        alertTip: '',
      })
    }

    /**
   * 已选择的商品数据
   * @type {Array}
   */
     selectedProList = []; 

       /**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  handleInput = (type,value) =>{
    console.log('value'.value);
    switch(type){
      case 'orderSum':
        value = value.replace(/\D/g, '');
      break;
      case 'name':
      break;
      case 'phoneNo':
        value = value.replace(/\D/g, '');
      break;
      default:;
    }
    this.props.saveFormData(value, type);
  }

    // 初始化数据，获取已选择的商品
    initData = props => {
      this.selectedProList = [];
      props.proData.dataList.forEach(item => {
        if(item.selectStatus && item.selectNum){
          this.selectedProList.push(item);
        }
      })
    }

  sumitForm  = ()=>{
    const {orderSum, name, phoneNo} = this.props.formData;
    console.log(this.props.formData);
    let alertTip = '';
    if(!orderSum.toString().length){
      alertTip = '请填写金额';
    }else if(!name.toString().length){
      alertTip = '请填写姓名';
    }else if(!phoneNo.toString().length){
      alertTip = '请填写正确的手机号';
    }else{
      alertTip = '添加数据成功';
      this.props.clearSelected();
      this.props.clearData();
    }
    this.setState({
      alertStatus: true,
      alertTip,
    })
  }

  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount(){
    this.initData(this.props);
  }
  

  render() {
    console.log('props',this.props);
    return (
      <main className="home-container">
        <PublicHeader title='首页' record/>
        <p className="common-title">请录入您的信息</p>
        <form className="home-form">
          <div className="home-form-tiem">
            <span>销售金额：</span>
            <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={(evt)=>{
              let value = evt.target.value
              this.handleInput('orderSum',value)
            }}/>
          </div>
          <div className="home-form-tiem">
            <span>客户姓名：</span>
            <input type="text" placeholder="请输入客户姓名" value={this.props.formData.name} onChange={
              (evt)=>{
                let value = evt.target.value
                this.handleInput('name',value)
              }
            }/>
          </div>
          <div className="home-form-tiem">
            <span>客户电话：</span>
            <input type="text" placeholder="请输入客户电话" value={this.props.formData.phoneNo} onChange={ 
              (evt)=>{
                let value = evt.target.value
                this.handleInput('phoneNo',value)
              }
              
            }/>
          </div>
        </form>
        <p className="common-title">请选择销售的产品</p>
        <Link to="/production" className="common-select-btn">
            {
              this.selectedProList.length ? <ul className="selected-pro-list">
                {
                  this.selectedProList.map((item, index) => {
                    return <li key={index} className="selected-pro-item ellipsis">{item.product_name}x{item.selectNum}</li>
                  })
                }
              </ul>: '请选择选择产品' 
            }
          </Link>
          <p className="common-title">请上传发票凭证</p>
          <div className="upload-img-con">
            <div className="file-lable">
              <span className="common-select-btn">上传图片</span>
              <input type="file" onChange={this.uploadImg}/>
            </div>
            <img className="select-img" alt=""/>
          </div>
          <TouchableOpacity className="submit-btn" clickCallBack={()=>this.sumitForm()} text='提交' />
          <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip}  alertStatus={this.state.alertStatus}/>
      </main>
    )
  }
}


Home.propTypes = {
  formData: propTypes.object.isRequired,
  saveFormData: propTypes.func.isRequired,
  saveImg: propTypes.func.isRequired,
  clearData: propTypes.func.isRequired,
  clearSelected: propTypes.func.isRequired,
}

export default connect(state=>({
  formData: state.formData,
  proData: state.proData,
}),{
  saveFormData, 
  saveImg,
  clearData,
  clearSelected,
})(Home)