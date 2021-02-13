import "regenerator-runtime/runtime";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./store";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};
const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  pReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
