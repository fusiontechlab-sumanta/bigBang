import { GET_CRICKET_LEAGUE, GET_SOCCER_LEAGUE, GET_TENNIS_LEAGUE } from "../constant";


export const getTennisLeagueAction=()=>{
    console.log("tennis league action");
    return{
    type: GET_TENNIS_LEAGUE,
  }
  }
export const getCricketLeagueAction=()=>{
    console.log("cricket league action");
    return{
    type: GET_CRICKET_LEAGUE,
  }
  }

export const getSoccerLeagueAction=()=>{
    console.log("soccer league action");
    return{
    type: GET_SOCCER_LEAGUE,
  }
  }
