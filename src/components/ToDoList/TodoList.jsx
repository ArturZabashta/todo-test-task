import React, { useState } from "react";
import ToDoItem from '../ToDoItem/ToDoItem'
import { useSelector } from "react-redux";

const ToDoList = ({props}) => {
  const {todoItemList} = useSelector(state => state.todo)
  console.log('todoItemList', todoItemList)
  /*
  const [todos, setTodos] = useState([
    {id:1, title: 'todo_1', description: 'Need to do todo_1'},
    {id:2, title: 'todo_2', description: 'Need to do todo_2'},
    {id:3, title: 'todo_3', description: 'Need to do todo_3'},
  ])*/

  const filteredTodoItemList = [...todoItemList].filter(item => {
    let regexp = (props.length > 0)? new RegExp(`${props}`): /[\w]*/;
    return (item.hashtag.search(regexp) !== -1)
  })
  
  return(
    <section className="todo-list">      
      {
      (todoItemList.length !==0) 
      ? filteredTodoItemList.map(item => <ToDoItem props={item} key={item.id}/>)
      : <p className="message-empty"> There is no available ToDos</p>    
    }      
    </section>

  );
}
export default ToDoList;