# electron-demo-2025

An Electron application with React

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

// 3-3 Авторизированный клиент
// 2-2 Менеджер
// 1-1 Администратор

94d5ous@gmail.com
uzWC67
Администратор
Никифорова Весения Николаевна



Что нужно делать:

1) npm i



Вопросы:

1) \src\renderer\src\LoginForm.jsx:
Зачем только при роли администратора он указывает переходить в магазин, если во-первых: есть ещё как минимум Менеджер и Авторизованный клиент,
а во-вторых: у него же и так работает переход

2) src\preload\index.js:
Зачем инвокировать(?..) user?

3) \src\renderer\src\main.jsx:
Как объединить Сизовские App и main?
(у меня получилось просто запихнуть их в один файл, но они всё равно раздельно находятся)

