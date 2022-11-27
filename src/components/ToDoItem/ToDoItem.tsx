import React, { useState, useEffect } from "react";
import MyButton from "../UI/MyButton/MyButton";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setCurrentTodo, setEditItem, setDeleteItem } from "../../redux/todoSlice";
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
import { TodoItem }  from "../../api/interface"

interface TodoItemProps {
  props: TodoItem
}

const ToDoItem: React.FC<TodoItemProps>  = ({props}) => {
  const dispatch = useAppDispatch();
  const {currentTodo} = useAppSelector(state => state.todo)
  const defaultState = props 
  const [item, setItem] = useState(defaultState)
  const [itemTags, setItemTags] = useState(item.hashtag) 
  const [editDescription, setEditDescription] = useState(true)
  const [editTag, setEditTag] = useState(true)

  useEffect(()=> {
    if (currentTodo === props.id) {      
    } else {
      setItem(defaultState)
      setEditDescription(true)
      setEditTag(true)
    }
  }, [currentTodo])

  useEffect(()=> {
    setItem({...item, hashtag:itemTags})    
    dispatch(setEditItem(item))
  }, [itemTags])

  const handleItemChoose = () => {  
    dispatch(setCurrentTodo(props.id))
  }
  const handleMouseEnter = ()=> {
    if (!currentTodo) {
      dispatch(setCurrentTodo(props.id))
    }  

  }
  const handleMouseLeave = ()=> {  
    if (editDescription && editTag) {
      dispatch(setCurrentTodo(-100))
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setItem(prev => {
      return {
        ...prev, title: event.target.value
      }
    })
  }

  const handleDescriptionChange = (event: string) => {    
    setItem({...item, description: event})
  }

  const handleHashtagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemTags(event.target.value)
    setItem({...item, hashtag: itemTags}) 
    dispatch(setEditItem(item)) 
  }

  function getHashtags() {    
    const regex = /#\w+/mg;
    const hashtagsStr = Array.from(item.description.matchAll(regex)).map(item => item[0]).join(' ');
  
    setItemTags(hashtagsStr)
    setItem({...item, hashtag: hashtagsStr})
    dispatch(setEditItem(item))
  }

  const handleSaveItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {   
    if (editDescription === false)   {
      getHashtags()      
    }
    setEditDescription(prev => !prev)
    dispatch(setEditItem(item))
  }  

  function handleSaveHashtagChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (editTag === false) {
      dispatch(setEditItem(item))      
    }
    setEditTag(prev => !prev)
  }

  const handleDeleteItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setDeleteItem(item))
  }

  return(
    <article 
      className={currentTodo === props.id? "todo-item public-DraftStyleDefault-block __activated": 'todo-item public-DraftStyleDefault-block'} 
      onClick={handleItemChoose}
      onMouseEnter = {handleMouseEnter}
      onMouseLeave = {handleMouseLeave}
    >
      <input 
        className="todo-title public-DraftStyleDefault-block" 
        value={item.title}
        disabled
        onChange={handleTitleChange}
      />
      {!editDescription
      ? <HighlightWithinTextarea        
      data-description={'description' + props.id}
      highlight={/#\w+/mg}
      value={item.description}      
      onChange={handleDescriptionChange}
    />
      :<textarea 
      className="todo-description public-DraftStyleDefault-block" 
      data-description={'description' + props.id}      
      value={item.description}
      disabled={true}
      //onChange={handleDescriptionChange}
    />
      }
      <div className="hashtag">
        <label className="hashtag-title">#tags:</label>
        <input 
          className="hashtag-list public-DraftStyleDefault-block"
          data-hash={'hash' + props.id}          
          value={itemTags}
          disabled={editTag}
          onInput={handleHashtagChange}
        />
        <MyButton 
          id={'edit-tag' + props.id}
          className="hashtag-edit public-DraftStyleDefault-block"
          data-edit={'edit' + props.id}
          getSubmit={handleSaveHashtagChange}        
        >{editTag? 'Edit tag': 'Save tag'}</MyButton>
      </div>
      
      <div className="todo-controls">
        <MyButton
          id={'edit-description' + props.id}
          className="save-button public-DraftStyleDefault-block" 
          getSubmit={handleSaveItem}
          data-save={'save' + props.id}
        >
          {editDescription? 'Edit todo': 'Save todo'}
        </MyButton>
        <MyButton
          id={'delete-description' + props.id}
          className="delete-button" 
          getSubmit={handleDeleteItem}
        >
          Delete todo
        </MyButton>
      </div>      
    </article>

  );
}
export default ToDoItem;