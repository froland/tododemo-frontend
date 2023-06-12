import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function TodoForm({ onExit }) {
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  async function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const accessToken = await getAccessTokenSilently();
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ description }),
    }).then(onExit);
  }

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h2>Ajouter une tâche</h2>
      </header>
      <fieldset disabled={disabled}>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <div>
          <button type="submit">Ajouter</button>
          <button type="button" onClick={onExit}>
            Annuler
          </button>
        </div>
      </fieldset>
    </form>
  );
}
