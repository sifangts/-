// //数据处理
// import { type } from "../action"

// //初始化状态
// const initialState={
//     menuName:'首页'
// }

// export default function (state=initialState,action){
//    switch (action) {
//     case type.SWITCH_MENU:
//         return {
//             ...state,//原有的状态
//             menuName:action.menuName//新的状态
//         }
        
//     default:
//         break;
//    }
// }

const initialState = {
    menuName:'首页'
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state=initialState,action) {
    switch(action.type){
      case 'SWITCH_MENU':
        return {
          ...state,
          menuName:action.menuName
        }
      default:{
        return state;
      }
    }
  }