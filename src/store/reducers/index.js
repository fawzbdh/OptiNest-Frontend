// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import project from './projectReducer';
import fichier from './fichierReducer';
import authReducer from './authSlice';
import container from './containerReducer';
import format from './formatReducer';
import feedbackSlice from './feedbackSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, project, fichier, feedback: feedbackSlice, auth: authReducer, container, format });

export default reducers;
