import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import downloadReducer from './reducers/downloadReducer';
import { formReducer, validationFormReducer } from './reducers/formReducer';
import {uploadReducer, uploadStatsReducer, } from './reducers/uploadReducer';

const uploadStats = Cookie.getJSON('uploadStats') || { bytes: 0, progress: 0, time: 0 };

const initialState = {
    uploadStats
};

const reducer = combineReducers({
  upload: uploadReducer,
  uploadStats: uploadStatsReducer,
  form: formReducer,
  validation: validationFormReducer,
  download: downloadReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;