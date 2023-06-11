import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import LogoutButton from './LogoutButton.jsx';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

function TodoHome() {
  const [showForm, setShowForm] = useState(false);
  const {user} = useAuth0();

  return (
    <>
      <p>Vous êtes authentifié en tant que {user.name} <LogoutButton/></p>
      {showForm ? <TodoForm onExit={() => setShowForm(false)}/> : <TodoList onShowForm={() => setShowForm(true)}/>}
    </>
  )
}

export default TodoHome;
