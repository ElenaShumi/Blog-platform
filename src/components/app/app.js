import { Routes, Route } from 'react-router-dom'

import Header from '../header'
import Main from '../main'
import ArticleItem from '../articleItem'
import SignUp from '../signUp'
import SignIn from '../signIn'
import Profile from '../profile'
import CreateArticle from '../createArticle'
import EditArticle from '../editArticle'
import RequireAuth from '../../hoc/requireAuth'

function App() {
  return (
    <>
      <Routes>
        <Route forceRefresh={true} path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route forceRefresh={true} path="articles" element={<Main />} />
          <Route path="articles/:slug" element={<ArticleItem />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="new-article"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
