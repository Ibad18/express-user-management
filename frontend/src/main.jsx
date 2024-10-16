import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MaterialUITableWithButtons from './MaterialUI.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <MaterialUITableWithButtons /> */}
  </StrictMode>,
)
