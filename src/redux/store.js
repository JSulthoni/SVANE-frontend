import bagSlice from './bagSlice';
import navigationSlice from './navigationSlice';
import authenticationSlice from './authenticationSlice';
import notificationSlice from './notificationSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const bagConfig = {
    key: 'bag',
    version: 1,
    storage,
};

const navigationConfig = {
    key: 'navigation',
    version: 1,
    storage,
    whitelist: ['nightmode']
};

const authConfig = {
    key: 'authentication',
    version: 1,
    storage,
    blacklist: []
}

const notifConfig = {
    key: 'notification',
    version: 1,
    storage,
    blacklist: []
}

const bagReducer = persistReducer(bagConfig, bagSlice);
const navigationReducer = persistReducer(navigationConfig, navigationSlice);
const authenticationReducer = persistReducer(authConfig, authenticationSlice);
const notificationReducer = persistReducer(notifConfig, notificationSlice);

// Combining 3 reducers with combineReducers()
const allReducer = combineReducers({
    bag : bagReducer, 
    navigation : navigationReducer,
    authentication : authenticationReducer,
    notification : notificationReducer 
})

export const store = configureStore({
    reducer: allReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
});

export const persistor = persistStore(store);