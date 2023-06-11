import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="froland-projint-m1-2223-sandbox.eu.auth0.com"
    clientId="DfA4awuxoTYtsASqLGJ6nW3ERA14plfn"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Auth0Provider>,
);
