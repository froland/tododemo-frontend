import useSWR from 'swr';

export default function TodoList({ onShowForm }) {
  const fetcher = (url) => fetch(url, { headers: { Accept: 'application/json' } }).then((r) => r.json());
  const { data, isLoading, error } = useSWR('/api/todos', fetcher);
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;

  return (
    <main>
      <header>
        <h2>Liste des tâches</h2>
        <button type="button" onClick={onShowForm}>
          Ajouter une tâche
        </button>
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
  function handleClick(item) {
    item.done = !item.done;
    fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  }

  return (
    <li>
      <input type="checkbox" defaultChecked={item.done} onClick={() => handleClick(item)}/>
      {item.description}
    </li>
  );
}
