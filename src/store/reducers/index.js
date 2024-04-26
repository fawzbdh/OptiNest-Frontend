// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import user from './userReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, user });

export default reducers;
