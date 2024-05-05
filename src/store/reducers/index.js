// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import project from './projectReducer';
import fichier from './fichierReducer';
import authReducer from './authSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, project, fichier, auth: authReducer });

export default reducers;
