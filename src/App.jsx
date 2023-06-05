import './App.css'
import TodoForm from "./TodoForm.jsx";
import {useState} from "react";

function TodoList() {
  return (<h2>Todo list</h2>);
}

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <h1>Todo demo</h1>
      <hr/>
      {showForm
        ?
        <TodoForm onSubmit={() => setShowForm(false)}/>
        :
        <div>
          <button type="button" onClick={() => setShowForm(true)}>Ajouter une tâche</button>
          <TodoList/>
        </div>
      }
    </>
  )
}

export default App
