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
import csv from './csvReducer';
import optimisation from './optimisationReducer';
import resultat from './resualtReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  project,
  fichier,
  feedback: feedbackSlice,
  auth: authReducer,
  container,
  format,
  csv,
  optimisation,
  resultat
});

export default reducers;
