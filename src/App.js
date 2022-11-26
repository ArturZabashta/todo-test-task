import React, { useState } from "react";
import './App.css';
import ToDoForm from './components/UI/ToDoForm/ToDoForm';
import ToDoList from './components/ToDoList/TodoList';
import ToDoInput from './components/UI/ToDoInput/ToDoInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo, setInitialState } from './redux/todo';

function App() {
  const dispatch = useDispatch();
  const {todoItemList} = useSelector(state => state.todo)
  const [filter, setFilter] = useState('')
  const handleClick  = (event) => {
    const check = event.target.classList.contains('public-DraftStyleDefault-block')
    if (!check) {
      // console.log(event.target.classList[0])
      dispatch(setCurrentTodo(null))
    }    
  }

  window.addEventListener('beforeunload', ()=> {
    localStorage.setItem('todoList', JSON.stringify(todoItemList))
  })

  window.addEventListener('load', ()=> {
    if (localStorage.getItem('todoList')) {
      const todoList = JSON.parse(localStorage.getItem('todoList'))
      dispatch(setInitialState(todoList))
    }
  })

  const handleSearchChange = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div className="App" onClick={handleClick}>
      <ToDoForm />
      <div className="header">
        <h1 >ToDo Manager</h1>
        <div className="header-search">
          <label>Search    </label>
          <ToDoInput 
              value={filter} 
              id="input-search" 
              type="text"
              placeholder="Add #tag to filter"
              onChange={handleSearchChange}
            />
        </div>        
      </div>      
      <ToDoList props={filter}/>    
    </div>
  );
}

export default App;
