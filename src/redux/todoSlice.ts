import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState, TodoItem } from "../api/interface";

const initialState: TodoState = {
  todoItemList: [],
  currentTodo: -100
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<TodoItem[]>) => {
      state.todoItemList = action.payload
    },
    setCreateItem: (state, action: PayloadAction<TodoItem>) => {
      // const stateCopy = state.todoItemList.slice(0)
      // stateCopy.push({...action.payload})
      state.todoItemList = [...state.todoItemList, action.payload]
    },
    setEditItem: (state, action: PayloadAction<TodoItem>) => {      
      state.todoItemList = state.todoItemList.map(item => {
        if (item.id !== action.payload.id) {
          return item
        }else {
          return {...action.payload}
        }
      })
    },
    setDeleteItem: (state, action: PayloadAction<TodoItem>) => {
      state.todoItemList = state.todoItemList.filter(item => item.id !== action.payload.id )
    },    
    setCurrentTodo: (state, action: PayloadAction<number>) => {      
      state.currentTodo = action.payload
    }
  }
})

export const {
  setInitialState,
  setCreateItem,
  setEditItem,
  setDeleteItem,
  setCurrentTodo
} = todoSlice.actions;

export default todoSlice.reducer;