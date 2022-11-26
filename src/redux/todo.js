import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoItemList: [],
    currentTodo: null
  },
  reducers: {
    setInitialState: (state, action) => {
      state.todoItemList = action.payload
    },
    setCreateItem: (state, action) => {
      const stateCopy = state.todoItemList.slice(0)
      stateCopy.push({...action.payload})
      state.todoItemList = stateCopy
    },
    setEditItem: (state, action) => {      
      state.todoItemList = state.todoItemList.map(item => {
        if (item.id !== action.payload.id) {
          return item
        }else {
          return {...action.payload}
        }
      })
    },
    setDeleteItem: (state, action) => {
      state.todoItemList = state.todoItemList.filter(item => item.id !== action.payload.id )
    },
    setItemTag: (state, action) => {
      state.todoItemList = state.todoItemList.map(item => {
        if (item.id !== action.payload.id) {
          return item
        }else {
          return {...action.payload}
        }
      })
    },
    setCurrentTodo: (state, action) => {
      console.log(`setCurrentTodo::state `, state.currentTodo)
      state.currentTodo = action.payload
    }
  }
})

export const {
  setInitialState,
  setCreateItem,
  setEditItem,
  setDeleteItem,
  setItemTag,
  setCurrentTodo
} = todoSlice.actions;

export default todoSlice.reducer;