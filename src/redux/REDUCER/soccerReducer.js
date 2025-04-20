import { SET_SOCCER_LEAGUE } from "../constant";



export const getSoccerData=(state={loading:false,data:[]},action)=>{
    switch (action.type) {
        case SET_SOCCER_LEAGUE:
            return { ...state, data: action.data };
          
    
            default:
                return state;
    }
}