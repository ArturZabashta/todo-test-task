import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import toDoReducer from "./todoSlice";

const reducers = combineReducers ({
  todo: toDoReducer,
});

const  store = configureStore({
reducer: reducers,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;