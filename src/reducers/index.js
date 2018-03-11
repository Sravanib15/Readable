import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import commentsReducer from './commentsReducer';
import postReducer from './postReducer';

export default combineReducers({ categoryReducer, commentsReducer, postReducer } );
