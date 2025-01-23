import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { Aaa } from './Aaa.jsx'
import { ReserveDisplay } from './components/ReserveDisplay.jsx'
import { ReserveTable } from './components/ReserveTable.jsx'
import { ReserveModal } from './components/ReserveModal.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Login } from './pages/Login';
// import Reserve from './components/ReserveDisplay'

// import { Login } from './pages/Login.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <ReserveDisplay /> */}

    <BrowserRouter>
            {/* <Link to="/">Home</Link> | <Link to="/about">About</Link> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/reserve" element={<ReserveDisplay />} />
              <Route path="*" element={<h1>Not Found Page</h1>} />
            </Routes>
          </BrowserRouter>
    

  </StrictMode>,
)
