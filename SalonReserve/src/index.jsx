import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Login } from './pages/Login';
import Reserve from './components/ReserveDisplay'

const index = () => {
    <div className="App">
      <BrowserRouter>
        {/* <Link to="/">Home</Link> | <Link to="/about">About</Link> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
}