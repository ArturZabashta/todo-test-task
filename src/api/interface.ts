
export type TodoItem = {
  id: number;
  title: string;
  description: string;
  hashtag: string
}

export type TodoState = {
  todoItemList: TodoItem[];
  currentTodo: number  
}