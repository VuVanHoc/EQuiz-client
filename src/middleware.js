import 'regenerator-runtime/runtime'
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./store";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
