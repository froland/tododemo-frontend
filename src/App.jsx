import './App.css'
import TodoForm from "./TodoForm.jsx";
import {useState} from "react";
import useSWR from "swr";

function TodoItem({item}) {
  function handleClick(item) {
    item.done = !item.done;
    fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    });
  }

  return <li key={item.id}>
    <input type="checkbox" defaultChecked={item.done} onClick={() => handleClick(item)}/>
    {item.description}
  </li>;
}

function TodoList() {
  const fetcher = url => fetch(url).then(r => r.json());
  const {data, isLoading, error} = useSWR('/api/todos', fetcher);
  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur</p>
  else return (
    <main>
      <h2>Todo list</h2>
      <ul>
        {data.map(todo => <TodoItem item={todo}/>)}
      </ul>
    </main>
  );
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
