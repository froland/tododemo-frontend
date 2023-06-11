import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import LoginButton from './LoginButton.jsx';
import TodoHome from './TodoHome.jsx';

function App() {

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <>
      <h1>Todo demo</h1>
      {isAuthenticated ? <TodoHome/> : <LoginButton/>}
    </>
  );
}

export default App;
