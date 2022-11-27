import React, { useState} from 'react';
import MyInput from '../MyInput/MyInput';
import MyButton from '../MyButton/MyButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setCreateItem } from '../../../redux/todoSlice';

const ToDoForm = () => {
  const dispatch = useAppDispatch();
  const {todoItemList} = useAppSelector(state => state.todo)
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleTitleChange = (value: string) => {
    setTitle(value)
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {    
    event.preventDefault()
    let id;
    if (todoItemList.length > 0) {
      id = todoItemList[todoItemList.length-1].id + 1;
    } else { 
      id = 100;
    }
    const regex = /#\w+/mg;
    const hashtagsStr = Array.from(description.matchAll(regex)).map(item => item[0]).join(' ');
    const newTodo = {
      id: id,
      title: title,
      description: description,
      hashtag: hashtagsStr,
    }
    dispatch(setCreateItem(newTodo))
    setTitle('')
    setDescription('')
  }
 
  return( 
    <form className='todo-form'>
      <div className='input-wrapper'>
        <label className='label-title' >ToDo title:</label>
        <MyInput 
          value={title} 
          id="input-title" 
          type="text"
          placeholder="Add ToDo title"
          getChange={handleTitleChange}
        />
      </div>
      <div className='input-wrapper'>
        <label className='label-description' >ToDo description:</label>
        <MyInput 
          value={description} 
          id="input-description" 
          type="textarea"
          placeholder="Add ToDo description"
          getChange={handleDescriptionChange}
        />
      </div>
      
      <MyButton 
        children='Add ToDo'
        className=''
        id="add-todo" 
        getSubmit={handleSubmit}
      ></MyButton>
    </form>   
    
  );
}

export default ToDoForm;