import { combineReducers } from '@reduxjs/toolkit';
import authReducers from './authSlice'; 
import cartReducers from './cartSlice'; 

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],  
};



const appReducer = combineReducers({
  auth: authReducers,
  cart:cartReducers
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const persistedAuthReducer = persistReducer(authPersistConfig, rootReducer);



export default persistedAuthReducer;
