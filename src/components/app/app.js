import { Routes, Route } from 'react-router-dom'

import Header from '../header'
import Main from '../main'
import ArticleItem from '../articleItem'
import SignUp from '../signUp'
import SignIn from '../signIn'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="articles" element={<Main />} />
          <Route path="articles/:slug" element={<ArticleItem />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* <Route path="*" element={<NotFoundPage />} /> Создать этот компонент*/}
        </Route>
      </Routes>
    </>
  )
}

export default App
