import { combineReducers } from 'redux';

import category from './category';
import post from './post';

export default combineReducers({ category, post });