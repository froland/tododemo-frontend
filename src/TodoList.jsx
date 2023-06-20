import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import PermissionGuard from './PermissionGuard.jsx';

export default function TodoList({ onShowForm }) {
  const { getAccessTokenSilently } = useAuth0();

  const fetcher = async (url) => {
    const accessToken = await getAccessTokenSilently();
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json());
  };

  const { data, isLoading, error } = useSWR('/api/todos', fetcher);

  if (error) return <p>Erreur</p>;
  if (isLoading) return <p>Chargement...</p>;

  return (
    <main>
      <header>
        <h2>Liste des tâches</h2>
        <PermissionGuard permission={'write:todos'}>
          <button type="button" onClick={onShowForm}>
            Ajouter une tâche
          </button>
        </PermissionGuard>
      </header>
      <ul>
        {data.map((todo) => (
          <TodoItem key={todo.id} item={todo}/>
        ))}
      </ul>
    </main>
  );
}

function TodoItem({ item }) {
  const { getAccessTokenSilently } = useAuth0();

  async function handleClick(item) {
    item.done = !item.done;
    const accessToken = await getAccessTokenSilently();
    fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  }

  return (
    <li>
      <PermissionGuard permission={'write:todos'}>
        <input type="checkbox" defaultChecked={item.done} onClick={() => handleClick(item)}/>
      </PermissionGuard>
      {item.description}
    </li>
  );
}
