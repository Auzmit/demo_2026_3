import './assets/main.css'

import { StrictMode } from 'react';
import { Routes, Route, HashRouter } from 'react-router';
import ReactDOM from 'react-dom/client';

import LoginForm from './LoginForm';
import Store from './Store';
import Orders from './Orders';

import { useState } from 'react';

function App() {
  const [user, setUser] = useState({ role: 'guest', name: null });
  return (
    <>
      <img className="logo" src="src/assets/icon.JPG" alt="icon" />
      <HashRouter>
        <StrictMode>
          <Routes>
            <Route path='/' element={<LoginForm user={user} setUser={setUser}/>}/>
            <Route path='/store' element={<Store user={user} setUser={setUser}/>}/>
            <Route path='/orders' element={<Orders user={user} setUser={setUser}/>}/>
          </Routes>
        </StrictMode>
      </HashRouter>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
);
