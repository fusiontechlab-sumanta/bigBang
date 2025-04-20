import { GET_CRICKET_LOADING, GET_LOADING, GET_SOCCER_LOADING, GET_TENNIS_LOADING, SET_ALL_SPORTS,} from "../constant";

export const allSportsData = (state = { loading: false,cricket:false,soccer:false,tennis:false, data: [] }, action) => {
  switch (action.type) {
    case SET_ALL_SPORTS:
      return { ...state, data: action.data };
    case GET_LOADING:
      return { ...state, loading: action.payload };
    case GET_CRICKET_LOADING:
      return { ...state, cricket: action.payload };
    case GET_SOCCER_LOADING:
      return { ...state, soccer: action.payload };
    case GET_TENNIS_LOADING:
      return { ...state, tennis: action.payload };
    default:
      return state;
  }
};


