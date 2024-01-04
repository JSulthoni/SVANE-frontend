import bagSlice from './bagSlice';
import checkoutSlice from './checkoutSlice';
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
    version: 2,
    storage,
    whitelist: ['wishlist']
};

const checkoutConfig = {
    key: 'checkout',
    version: 2,
    storage,
    whitelist: []
}

const navigationConfig = {
    key: 'navigation',
    version: 2,
    storage,
    whitelist: ['nightmode']
};

const authConfig = {
    key: 'authentication',
    version: 2,
    storage,
    whitelist: []
}

const notifConfig = {
    key: 'notification',
    version: 2,
    storage,
    whitelist: []
}

const bagReducer = persistReducer(bagConfig, bagSlice);
const checkoutReducer = persistReducer(checkoutConfig, checkoutSlice);
const navigationReducer = persistReducer(navigationConfig, navigationSlice);
const authenticationReducer = persistReducer(authConfig, authenticationSlice);
const notificationReducer = persistReducer(notifConfig, notificationSlice);

// Combining 3 reducers with combineReducers()
const allReducer = combineReducers({
    bag : bagReducer, 
    checkout : checkoutReducer,
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