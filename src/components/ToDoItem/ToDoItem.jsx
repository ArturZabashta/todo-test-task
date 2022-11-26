import React, { useState, useEffect, useCallback } from "react";
import MyButton from "../UI/MyButton/MyButton";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTodo, setEditItem, setDeleteItem, setItemTag } from "../../redux/todo";

import { HighlightWithinTextarea } from 'react-highlight-within-textarea'
//import Highlight from "../../api/Highlight";

const ToDoItem = ({props}) => {
  const dispatch = useDispatch();
  const {currentTodo} = useSelector(state => state.todo)
  const defaultState = {...props}  
  const [item, setItem] = useState(defaultState)
  const [itemTags, setItemTags] = useState(item.hashtag) 
  //const [regex, setRegex] = useState("")
  const [editDescription, setEditDescription] = useState(true)
  const [editTag, setEditTag] = useState(true)

  useEffect(()=> {
    if (currentTodo === props.id) {
      console.log(`Clicled `, props.id)
    } else {
      setItem(defaultState)
      setEditDescription(true)
      setEditTag(true)
    }
  }, [currentTodo])

  useEffect(()=> {
    setItem({...item, hashtag:itemTags})
  }, [itemTags])

  // const light = useCallback((str) => {
  //   return <Highlight filter={regex} str={str}></Highlight>
  // }, [regex])
 

  const handleItemChoose = ()=> {  
    dispatch(setCurrentTodo(props.id))
  }
  const handleMouseEnter = ()=> {
    if (!currentTodo) {
      dispatch(setCurrentTodo(props.id))
    }  

  }
  const handleMouseLeave = ()=> {  
    if (editDescription && editTag) {
      dispatch(setCurrentTodo(null))
    }
  }

  const handleTitleChange = event => {  
    setItem(prev => {
      return {
        ...prev, title: event.target.value
      }
    })
  }

  const handleDescriptionChange = e => {
    console.log('handleDescriptionChange = e', e)
    setItem({...item, description: e})
  }

  const handleHashtagChange = event => {
    setItemTags(event.target.value)
    setItem({...item, hashtag: itemTags})  
  }

  function getHashtags() {    
    const regex = /#\w+/mg;
    const hashtagsStr = Array.from(item.description.matchAll(regex)).map(item => item[0]).join(' ');
  
    setItemTags(hashtagsStr)
    setItem({...item, hashtag: hashtagsStr})
    dispatch(setEditItem(item))
  }

  const handleSaveItem = (event) => {   
    if (editDescription === false)   {
      getHashtags()      
    }
    setEditDescription(prev => !prev)
  }  

  function handleSaveHashtagChange(event) {
    if (editTag === false) {
      dispatch(setEditItem(item))      
    }
    setEditTag(prev => !prev)
  }

  const handleDeleteItem = () => {
    dispatch(setDeleteItem(item))
  }

  return(
    <article 
      className={currentTodo === props.id? "todo-item public-DraftStyleDefault-block __activated":'todo-item public-DraftStyleDefault-block'} 
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
      className="todo-description public-DraftStyleDefault-block" 
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
      onChange={handleDescriptionChange}
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
          className="hashtag-edit public-DraftStyleDefault-block"
          data-edit={'edit' + props.id}
          onClick={handleSaveHashtagChange}        
        >{editTag? 'Edit tag': 'Save tag'}</MyButton>
      </div>
      
      <div className="todo-controls">
        <MyButton 
          className="save-button public-DraftStyleDefault-block" 
          onClick={handleSaveItem}
          data-save={'save' + props.id}
        >
          {editDescription? 'Edit todo': 'Save todo'}
        </MyButton>
        <MyButton className="delete-button" onClick={handleDeleteItem}>
          Delete todo
        </MyButton>
      </div>      
    </article>

  );
}
export default ToDoItem;