import { combineReducers } from "redux";
import { allSportsData} from "./REDUCER/gameReducer";
import { getTennisData} from "./REDUCER/tennisReducer";
import { getCricketData } from "./REDUCER/cricketReducer";
import { getSoccerData } from "./REDUCER/soccerReducer";
import { betReducer } from "./REDUCER/betReducer";


export default combineReducers({
    allSportsData,
    getTennisData,
    getCricketData,
    getSoccerData,
    betReducer
    
});