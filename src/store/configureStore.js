import { createStore } from 'redux'
import { applyMiddleware, compose } from 'redux'

import createSagaMiddleware from 'redux-saga'
import rootSaga from "../api/saga/index";
import logger from "redux-logger";

import rootReducer from './../reducers/index'

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        !+process.env.REACT_APP_PRODUCTION &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? compose(
                applyMiddleware(sagaMiddleware, logger),
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
            )
            : applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
    return store;
};
export default configureStore;
