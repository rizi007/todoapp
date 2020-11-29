import React, { useState }  from 'react';
import './App.css';
import {Todo} from './Todo';
import {TodoForm} from './TodoForm';
import {TodoComplete} from './TodoComplete';

export type Priority = 'Low' | 'Medium' | 'High';

export interface ITodoState {
  text: string;
  isCompleted: boolean;
  priority: Priority;
}

function App() {
  const [priority, setPriorityVal ] = useState("");
  const [filterVal, setFilterVal ] = useState("");
  const [filter, showFilter ] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]as  ITodoState[]);
  const [todos, setTodos] = useState([
    {
      text: "Organise inspections",
      isCompleted: false,
      priority: "Low"
    },
    {
      text: "Make sure to cancel selling my home",
      isCompleted: false,
      priority: "Low"
    },
    {
      text: "Get ready to go back home",
      isCompleted: false,
      priority: "Low"
    }
  ] as  ITodoState[]);
  const addTodo = (text: string) => {
    const newTodos = [...todos, { text, isCompleted: false, priority: "Low" } as ITodoState];
    setTodos(newTodos);
  };
  const setPriority = (value: Priority, index: number) => {
    const newTodos = [...todos];
    newTodos[index].priority = value;
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const filterTodoList = () => {
    const sortedTodos = todos.filter((todo: ITodoState) => todo.priority === priority && todo.text.toLowerCase().indexOf(filterVal.toLowerCase()));
    const otherHalf = todos.filter((todo: ITodoState) => todo.priority !== priority  && !todo.text.toLowerCase().indexOf(filterVal.toLowerCase()));
    todos.sort(function(a,b) {
      var x = a.priority 
      var y = b.priority
      return x === priority?-1:1 ;
  });
    setFilteredTodos([...sortedTodos, ...otherHalf]);
    showFilter(true);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <div>
       <select onChange={(event) => setPriorityVal(event.target.value) }>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={() => filterTodoList()} type="button"> Filter </button> 
      </div>
      <div className="todo-list">
        {(todos).map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            setPriority= {setPriority}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      <TodoComplete todoItems={todos} />
    </div>
  );
}

export default App;
