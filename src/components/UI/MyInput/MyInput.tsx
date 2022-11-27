import React, { useState } from 'react';

interface MyInputInputProps {
  value: string,
  id: string,
  type: string,
  placeholder: string
  getChange: (value: string) => void
}

const MyInput: React.FC<MyInputInputProps> = ({value, id, type, placeholder, getChange}) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    getChange(event.currentTarget.value)
  }

  return(
    <input 
      type={type} 
      value={value} 
      placeholder={placeholder} 
      id={id}
      onChange={handleInputChange}
    />
  );
}

export default MyInput;