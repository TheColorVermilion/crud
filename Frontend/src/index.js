import React from 'react';
import ReactDOM from 'react-dom/client';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-dark-indigo/theme.css"
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (reocess.env.NODE_ENV === 'production') disableReactDevTools()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

