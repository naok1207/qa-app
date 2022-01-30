# 開発時メモ

### ルーティング
`react-router-dom`
5系まではSwitchだったものが
6系ではRoutesに変更された

5系
```js
<Switch>
  <Route extract path="..." component="...">
  <Route path="..." component="...">
  <Route path="..." component="...">
</Switch>
```

6系
```js
<Routes>
  <Route extract path="..." component="...">
  <Route path="..." component="...">
  <Routes path="..." component="...">
</Routes>
```

参考
https://youonly.net/react-router-dom-switch/
https://reactrouter.com/docs/en/v6/getting-started/overview
