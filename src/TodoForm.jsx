import { useState } from 'react';

export default function TodoForm({onExit}) {
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    fetch('/api/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({description}),
    }).then(onExit);
  }

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>Ajouter une tâche</h2>
      </header>
      <fieldset disabled={disabled}>
        <label htmlFor='description'>Description</label>
        <input type='text' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <div>
          <button type='submit'>Ajouter</button>
          <button type='button' onClick={onExit}>
            Annuler
          </button>
        </div>
      </fieldset>
    </form>
  );
}
