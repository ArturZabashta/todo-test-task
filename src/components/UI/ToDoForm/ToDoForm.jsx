import React, { useState} from 'react';
import ToDoInput from '../ToDoInput/ToDoInput';
import MyButton from '../MyButton/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateItem } from '../../../redux/todo';

const ToDoForm = () => {
  const dispatch = useDispatch();
  const {todoItemList} = useSelector(state => state.todo)
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //const [item, setItem] = useState([])
  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }
  const handleSubmit = (event) => {
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
        <ToDoInput 
          value={title} 
          id="input-title" 
          type="text"
          placeholder="Add ToDo title"
          onChange={handleTitleChange}
        />
      </div>
      <div className='input-wrapper'>
        <label className='label-description' >ToDo description:</label>
        <ToDoInput 
          value={description} 
          id="input-description" 
          type="textarea"
          placeholder="Add ToDo description"
          onChange={handleDescriptionChange}
        />
      </div>
      
      <MyButton 
        id="add-todo" 
        onClick={handleSubmit}
      >Add ToDo</MyButton>
    </form>   
    
  );
}

export default ToDoForm;