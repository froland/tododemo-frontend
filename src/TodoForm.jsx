import {useState} from "react";

export default function TodoForm({onSubmit}) {
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    fetch('/api/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({description})
    }).then(onSubmit);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une tâche</h2>
      <fieldset disabled={disabled}>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button type="submit">Ajouter</button>
      </fieldset>
    </form>
  );
}