import './assets/main.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import electronLogo from './assets/electron.svg'
// import Store from './Store';

// import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react';
// import { Routes, Route, HashRouter } from 'react-router';


function App({ user, setUser}) {
  // useEffect(() => {
  //   (async (data="test") => await window.api.foo(data))()
  // }, [])

  // useEffect(() => {
  //   (async (loginFormData={ role: 'guest', name: null }) =>
  //     await window.api.authorizeUser(loginFormData))()
  // }, [])
    
  
  const navigate = useNavigate();
  // const [user, setUser] = useState({ role: 'guest', name: null });
  // useEffect(() => {
  //   if (user.role !== 'guest') {
  //     // console.log('not guest');
  //     console.log('useEffect', user);
  //     // navigate('/store');
  //   }
  // // }, [user, navigate]);
  // }, [user]);

  async function submitHandler(e) {
    e.preventDefault();
    const loginFormData = {
      login: e.target.login.value,
      password: e.target.password.value,
    }
    const authorizedUser = await window.api.authorizeUser(loginFormData);
    // const { login, password, role, fullname } = await window.api.autorizeUser(user);

    if (authorizedUser) {
      // console.log('before setUser', authorizedUser);
      setUser(authorizedUser);
      // console.log('after setUser', user);
      navigate('/store');
    }
  }

  return (
    <>
      {/* <img alt="logo" className="logo" src="../../../resources/icon.png" /> */}

      <h1>Приветствуем!</h1>
      <h4 className="loginFormHeader">Введите логин и пароль, чтобы войти:</h4>
      <form className="loginForm" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="login">Логин:</label>
        <input id="login" type="text" required />

        <label htmlFor="password">Пароль:</label>
        <input id="password" type="text" required />

        <button type="submit">Войти</button>
      </form>

      <h4 className="guestButtonHeader">Войти в магазин без регистрации:</h4>
      <button onClick={() => {
        setUser({ role: 'guest' });
        navigate('/store');
      }}>Посмотреть товары</button>
    </>
  )
}

export default App;
