import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
import { GET_ALL_SPORTS, GET_CRICKET_LEAGUE, GET_ERROR,GET_LOADING, GET_SOCCER_LEAGUE, GET_TENNIS_LEAGUE, SET_ALL_SPORTS, SET_CRICKET_LEAGUE, SET_SOCCER_LEAGUE, SET_TENNIS_LEAGUE,   } from "../redux/constant";
import { setLoading } from "./action/action";
import { VITE_GET_CRICKET_LEAGUE, VITE_GET_SOCCER_LEAGUE, VITE_GET_SPORTS_BY_EVENT_ID, VITE_GET_TENNIS_LEAGUE, VITE_URL } from "../constants/ApiUrl";

function* getAllSports(action) {
  console.log("all Sports saga call");
  yield put(setLoading(true)); // Dispatch loading action
  
  try {
    const res = yield axios.get(
      `${VITE_URL}${VITE_GET_SPORTS_BY_EVENT_ID}?eventType=[4,2,1,7,2378961,4339]`,
    );

    yield put({ type: SET_ALL_SPORTS, data: [res.data] });
  } catch (e) {
    console.error("Error in allSports getGame saga:", e);
    yield put({ type: GET_ERROR, data: e });
  } finally {
    yield put(setLoading(false)); // Dispatch loading action
  }
}
function* getTennisLeague(action) {
  console.log("Tennis saga call");
  yield put(setLoading(true)); // Dispatch loading action
  
  try {
    const res = yield axios.get(
      `${VITE_URL}${VITE_GET_TENNIS_LEAGUE}`,
    );

    yield put({ type: SET_TENNIS_LEAGUE, data: [res.data] });
  } catch (e) {
    console.error("Error in allSports getGame saga:", e);
    yield put({ type: GET_ERROR, data: e });
  } finally {
    yield put(setLoading(false)); // Dispatch loading action
  }
}
function* getCricketLeague(action) {
  console.log("Cricket saga call");
  yield put(setLoading(true)); // Dispatch loading action
  
  try {
    const res = yield axios.get(
      `${VITE_URL}${VITE_GET_CRICKET_LEAGUE}`,
    );

    yield put({ type: SET_CRICKET_LEAGUE, data: [res.data] });
  } catch (e) {
    console.error("Error in allSports getGame saga:", e);
    yield put({ type: GET_ERROR, data: e });
  } finally {
    yield put(setLoading(false)); // Dispatch loading action
  }
}
function* getSoccerLeague(action) {
  console.log("soccer saga call");
  yield put(setLoading(true)); // Dispatch loading action
  
  try {
    const res = yield axios.get(
      `${VITE_URL}${VITE_GET_SOCCER_LEAGUE}`,
    );

    yield put({ type: SET_SOCCER_LEAGUE, data: [res.data] });
  } catch (e) {
    console.error("Error in soccer league getGame saga:", e);
    yield put({ type: GET_ERROR, data: e });
  } finally {
    yield put(setLoading(false)); // Dispatch loading action
  }
}




function* productSaga() {
  // yield takeEvery(GET_ALL_SPORTS, getAllSports);
  // yield takeEvery(GET_TENNIS_LEAGUE, getTennisLeague);
  // yield takeEvery(GET_CRICKET_LEAGUE, getCricketLeague);
  // yield takeEvery(GET_SOCCER_LEAGUE, getSoccerLeague);
 
  // yield takeEvery(set_Series_info,  );
}

export default productSaga;
