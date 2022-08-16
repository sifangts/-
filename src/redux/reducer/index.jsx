//数据处理
import { type } from "../action"

//初始化状态
const initialState={
    menuName:'首页'
}

export default (state=initialState,action)=>{
   switch (action) {
    case type.SWITCH_MENU:
        return {
            ...state,//原有的状态
            menuName:action.menuName//新的状态
        }
        break;
    default:
        break;
   }
}

