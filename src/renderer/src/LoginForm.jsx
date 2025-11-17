import './assets/main.css';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import electronLogo from './assets/electron.svg'
import Store from './Store';

// import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react';
// import { Routes, Route, HashRouter } from 'react-router';

function App() {
  // useEffect(() => {
  //   (async (data="test") => await window.api.foo(data))()
  // }, [])

  const navigate = useNavigate();

  const [user, setUser] = useState({ role: 'guest', name: null })


  async function submitHandler(e) {
    e.preventDefault();
    const loginFormData = {
      login: e.target.login.value,
      password: e.target.password.value,
    }
    const authorizedUser = await window.api.authorizeUser(loginFormData);
    // const { login, password, role, fullname } = await window.api.autorizeUser(user);
    if (authorizedUser) {
      // console.log(111, authorizedUser);
      // setUser({ name: authorizedUser.name });
      setUser(authorizedUser);
      // console.log(222, user);

      // ??? Почему у Сизова нет этого нигде и у него это работает,
      // более того, у меня есть копия его проекта и она даже у меня работает, но КАК!?
      navigate('/store');
    }

    // ???
    // Зачем? Если и так каким-то чудом мы переходим по адресу магазина и там и так вывод надписи анализируется:
    // if (role === 'Администратор') {
    //   navigate('/store');
    // }

    // console.log(authorizedUser);
    // document.querySelector('form').reset();
  }

  // const [user, setUser] = useState({ role: 'не авторизован', name: null })

  return (
    <>
      {/* <img alt="logo" className="logo" src="../../../resources/icon.png" /> */}

      <h1>Приветствуем!</h1>
      <h4>Введите логин и пароль, чтобы войти</h4>
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="login">Логин:</label>
        <input id="login" type="text" required />

        <label htmlFor="password">Пароль:</label>
        <input id="password" type="text" required />

        <button type="submit">Войти</button>
      </form>

      <h5>Перейти без регистрации на экран просмотра товаров</h5>
      <button onClick={() => {
        setUser({ role: 'гость' });
        navigate('/store');
      }}>Посмотреть товары</button>
    </>
  )
}

export default App;
