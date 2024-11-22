import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { Aaa } from './Aaa.jsx'
import { ReserveDisplay } from './components/ReserveDisplay.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <ReserveDisplay />
  </StrictMode>,
)
