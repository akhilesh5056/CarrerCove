import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import jobReducer from "./jobSlice.js"
import companyReducer from "./companySlice.js"
import ApplicationReducer from "./applicationSlice.js"


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer=combineReducers({
    auth:authReducer,
    job:jobReducer,
    company:companyReducer,
    application:ApplicationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export default store;