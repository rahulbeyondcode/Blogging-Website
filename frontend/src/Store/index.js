import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import RootReducer from "../Store/reducer";
import Watchers from "../Store/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(Watchers);

export default store;
