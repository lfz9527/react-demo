import * as pro from './action-type';
import axios from 'axios';

// 初始化获取商品数据，保存至redux
export const getProData = () => {
  // 返回函数，异步dispatch
  return (dispatch) => {
    try{
        axios.get('http://localhost:3000/production.json').then(res=>{
          console.log('res===>',res);
            let result = res.data.data
            result.map(item => {
                item.selectStatus = true;
                item.selectNum = 0;
                return item;
              })
              console.log('result==>',result);
              dispatch({
                type: pro.GETPRODUCTION,
                dataList: result,
              })
        })
    }catch(err){
      console.error(err);
    }
  }
}

// 选择商品
export const togSelectPro = index => {
  return {
    type: pro.TOGGLESELECT,
    index,
  }
}

// 编辑商品
export const editPro = (index, selectNum) => {
  return {
    type: pro.EDITPRODUCTION,
    index,
    selectNum,
  }
}

// 清空选择
export const clearSelected = () => {
  return {
    type: pro.CLEARSELECTED,
  }
}



