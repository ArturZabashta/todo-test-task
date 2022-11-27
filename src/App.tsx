import React, { useState } from "react";
import './App.css';
import ToDoForm from './components/UI/ToDoForm/ToDoForm';
import ToDoList from './components/ToDoList/TodoList';
import ToDoSearch from './components/UI/ToDoSearch/ToDoSearch';
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setCurrentTodo, setInitialState } from './redux/todoSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {todoItemList} = useAppSelector(state => state.todo)
  const [filter, setFilter] = useState('')

  const handleClick  = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {    
    const check = event.currentTarget.tagName;    
    if (check === 'SECTUON' || check === 'FORM') {    
      dispatch(setCurrentTodo(-100))
    }    
  }

  window.addEventListener('beforeunload', ()=> {
    const array = Array.isArray(todoItemList)?  todoItemList: [];    
    localStorage.setItem('todoList', JSON.stringify(array))
  })

  window.addEventListener('load', ()=> {
    if (localStorage.getItem('todoList')) {      
      const todoList = JSON.parse(localStorage.getItem('todoList') || "")
      dispatch(setInitialState(todoList))
    }
  })

  const handleSearchChange = (value: string) => {
    setFilter(value)
    return value
  }

  return (
    <section className="App" onClick={handleClick}>
      <ToDoForm />
      <section className="header">
        <h1 >ToDo Manager</h1>
        <div className="header-search">
          <label>Search    </label>
          <ToDoSearch               
              id="input-search" 
              type="text"
              placeholder="Add #tag to filter"
              handleSearchChange={handleSearchChange}
            />
        </div>        
      </section>      
      <ToDoList props={filter}/>    
    </section>
  );
}

export default App;
