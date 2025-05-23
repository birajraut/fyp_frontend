import { configureStore } from '@reduxjs/toolkit'
import persistedReducer from '../reducers/rootReducer'
import { persistStore } from 'redux-persist'

 
const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE !== 'production',
})
 
const persistor = persistStore(store)
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 


 
export default store
export { persistor }
 
 