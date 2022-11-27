import React from "react";
import ToDoItem from '../ToDoItem/ToDoItem';
import { useAppSelector } from "../../redux/hooks";

interface ToDoListProps {
  props: string
}

const ToDoList: React.FC<ToDoListProps> = ({props}) => {

  const {todoItemList} = useAppSelector(state => state.todo)  
 
  const filteredTodoItemList =  todoItemList?.length > 0? [...todoItemList].filter(item => {
    let regexp = (props.length > 0)? new RegExp(`${props}`): /[\w]*/;
    return (item.hashtag.search(regexp) !== -1)
  }) : []
  
  return(
    <section className="todo-list">      
      {
      (todoItemList?.length !==0) 
      ? filteredTodoItemList.map(item => <ToDoItem props={item} key={item.id}/>)
      : <p className="message-empty"> There is no available ToDos</p>    
    }      
    </section>

  );
}
export default ToDoList;