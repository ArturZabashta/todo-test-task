import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import toDoReducer from "./todo"

const reducers = combineReducers ({
  todo: toDoReducer,
})

export const  store = configureStore({
reducer: reducers,
})