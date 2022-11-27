import React, { useState } from 'react';

interface ToDoInputProps {
  //value: string,
  id: string,
  type: string,
  placeholder: string
  handleSearchChange: (value: string) => string
}

const ToDoSearch: React.FC<ToDoInputProps> = ({id, type, placeholder, handleSearchChange}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(event.target.value)
  }
  return(
    <input 
      type={type}
      placeholder={placeholder} 
      id={id}
      onChange={handleSearch}
    />
  );
}

export default ToDoSearch;