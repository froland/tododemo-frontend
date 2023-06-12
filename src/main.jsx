import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="teacher-projint-2223.eu.auth0.com"
    clientId="mNHQkQomEzxKPSpn9JUdhK3LNaKPJK0G"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Auth0Provider>,
);
