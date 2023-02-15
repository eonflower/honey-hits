import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import reducer, { initialState } from './utils/reducer'
import { StateProvider } from './utils/StateProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <HashRouter>
    <App />
    </HashRouter>
  </StateProvider>,
)
