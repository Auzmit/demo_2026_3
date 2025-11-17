import './assets/main.css'

import { StrictMode } from 'react';
import { Routes, Route, HashRouter } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';

import LoginForm from './LoginForm';
import Store from './Store';

import { useState } from 'react';

function App() {
  // console.log('user.name:', user.name);
  const [user, setUser] = useState({ role: 'guest', name: null })
  return (
    <>
      <img className="logo" src="src/assets/icon.JPG" alt="icon" />
      {/* {console.log('user.name:', user.name)} */}
      {user.name ? <h1>{`${user.name} Роль: ${user.role}`}</h1> : <h1>Гость</h1>}
      <HashRouter>
      {/* ???  Почему не BrowserRouter?*/}
      {/* <BrowserRouter> */}
        <StrictMode>
          <Routes>
            <Route path='/' element={<LoginForm setUser={setUser}/>}/>
            <Route path='/store' element={<Store user={user} setUser={setUser}/>}/>
            {/* <Route path='/store' element={<Store/>}/> */}
          </Routes>
        </StrictMode>
      {/* </BrowserRouter> */}
      </HashRouter>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
)

// ??? Как объединить в этом файле App и ReactDom, в котором вызывается этот самый App?
// const [user, setUser] = useState({ role: 'не авторизован', name: 1 })

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <HashRouter>
//     <StrictMode>
//       <Routes>
//         <Route path='/' element={<LoginForm setUser={setUser}/>}/>
//         {/* <Route path='/store' element={<Store user={user} setUser={setUser}/>}/> */}
//         {/* <Route path='/store' element={<Store/>}/> */}
//       </Routes>
//     </StrictMode>
//   </HashRouter>
// )
