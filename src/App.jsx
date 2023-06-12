import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import './App.css';
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';

function App() {
  const [showForm, setShowForm] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>En chargement...</div>;
  }

  return (
    <>
      <div>
        <h1>Todo demo</h1>
        {isAuthenticated ?
          <div>
            <p>Bonjour {user.name} <LogoutButton/></p>
            {showForm ? <TodoForm onExit={() => setShowForm(false)}/> :
              <TodoList onShowForm={() => setShowForm(true)}/>}
          </div>
          :
          <LoginButton/>
        }
      </div>
    </>
  );
}

export default App;
