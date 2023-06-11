import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import useFetcher from './use-fetcher.js';

export default function TodoList({ onShowForm }) {
  const { fetcher } = useFetcher();
  const { data, isLoading, error } = useSWR('/api/todos', fetcher);
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;

  return (
    <main>
      <header>
        <h2>Liste des tâches</h2>
        <button type='button' onClick={onShowForm}>
          Ajouter une tâche
        </button>
      </header>
      <ul>
        {data.map((todo) => (
          <TodoItem key={todo.id} item={todo} />
        ))}
      </ul>
    </main>
  );
}

function TodoItem({ item }) {
  const { getAccessTokenSilently } = useAuth0();

  async function handleClick(item) {
    item.done = !item.done;
    const token = await getAccessTokenSilently();
    await fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Encoding: 'utf-8',
      },
      body: JSON.stringify(item),
    });
  }

  return (
    <li>
      <input type='checkbox' defaultChecked={item.done} onClick={() => handleClick(item)} />
      {item.description}
    </li>
  );
}
