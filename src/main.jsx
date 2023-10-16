import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css';
import { StateProvider } from './utils/StateProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
  </React.StrictMode>,
);