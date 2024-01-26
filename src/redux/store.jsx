import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

// configureStore.js

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer here
});
const persistor = persistStore(store);

const { dispatch } = store;

export { store, dispatch, persistor };
