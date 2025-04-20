import { configureStore } from "@reduxjs/toolkit";
import gameSaga from "./gameSaga";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "pari-match-root-store",
  storage,
};
//const store = createStore(rootReducer)

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [sagaMiddleware],
});
sagaMiddleware.run(gameSaga);
export const persistor = persistStore(store);
export default store;