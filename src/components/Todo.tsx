import React from 'react';
import {ITodoState, Priority} from './App';

export interface ITodo{
  todo: ITodoState;
  index: number;
  completeTodo: (index:number) => void;
  removeTodo: (index:number) => void;
  setPriority: (value: Priority, index:number) => void;
}

export const Todo = ({ todo, index, completeTodo, removeTodo, setPriority  }: ITodo) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <select value={todo.priority} onChange={(event) => setPriority(event.target.value as Priority, index)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
};