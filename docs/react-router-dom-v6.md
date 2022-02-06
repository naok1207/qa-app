# react-router-dom v6 の使い方

## 基本的なルーティング
書き方１
それぞれのページが表示される
```js
<Routes>
  <Route path="/" element={<Top />} />
  <Route path="/login" element={<Login />} />
</Route>

const Top = () => {
  return (
    <div>Top</div>
  );
}
```

書き方２
親要素のレイアウトが小要素に反映される
`Outlet`に子要素が反映される
```js
import { Outlet } from 'react-router-dom'

...

<Routes>
  <Route path="/" element={<Layout />} >
    <Route path="/login" element={<Login />} />
  </Route>
</Route>

...

const Layout = () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet>
    </div>
  );
}
```

書き方３
indexを指定して親要素を設定する
indexをより上の親要素を無視し、レイアウトをリセットすることができる
```js
import { Outlet } from 'react-router-dom'

...

<Routes>
  <Route path="/" element={<Layout />} >
    <Route index element={<Outlet />} />
    <Route path="/login" element={<Login />} />
  </Route>
</Route>

...

const Layout = () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet>
    </div>
  );
}
```

親コンポーネントの値を子コンポーネントから操作する
https://reactrouter.com/docs/en/v6/api#useoutletcontext
