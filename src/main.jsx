import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css';
import reducer, { initialState } from './utils/reducer'
import { StateProvider } from './utils/StateProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <StateProvider initialState={initialState} reducer={reducer}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StateProvider>,
  </React.StrictMode>,
);