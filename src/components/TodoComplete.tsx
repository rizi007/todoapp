import React from 'react';
import { ITodoState } from './App';

export const TodoComplete = ({todoItems}:any) => (
  <div> Completed Tasks { todoItems.filter((todo: ITodoState) => todo.isCompleted).length} </div>
)