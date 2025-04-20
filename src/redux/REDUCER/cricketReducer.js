import { SET_CRICKET_LEAGUE} from "../constant";


export const getCricketData=(state={loading:false,data:[]},action)=>{
    switch (action.type) {
        case SET_CRICKET_LEAGUE:
            return { ...state, data: action.data };
          
    
            default:
                return state;
    }
}