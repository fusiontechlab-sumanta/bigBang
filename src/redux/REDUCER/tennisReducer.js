import { SET_TENNIS_LEAGUE } from "../constant";


export const getTennisData=(state={loading:false,data:[]},action)=>{
    switch (action.type) {
        case SET_TENNIS_LEAGUE:
            return { ...state, data: action.data };
          
    
            default:
                return state;
    }
}