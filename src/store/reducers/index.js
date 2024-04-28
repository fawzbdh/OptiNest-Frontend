// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import user from './userReducer';
import project from './projectReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, user, project });

export default reducers;
