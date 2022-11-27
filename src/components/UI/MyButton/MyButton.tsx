import React from 'react';


interface MyButtonProps {
  children: string,
  className: string,
  id: string,
  getSubmit: (isSubmit: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MyButton: React.FC<MyButtonProps> = ({children, className, id, getSubmit}) => {
  return(    
    <button 
      className={className} 
      id={id}
      onClick={(event) => getSubmit(event)}
    >
      {children}
    </button>
  );
}

export default MyButton;