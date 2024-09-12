import { Routes, Route } from 'react-router-dom'

import Header from '../header'
import Main from '../main'
import ArticleItem from '../articleItem'

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Main /> */}
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="articles" element={<Main />} />
          <Route path="articles/:slug" element={<ArticleItem />} />
          {/* <Route path="*" element={<NotFoundPage />} /> Создать этот компонент*/}
        </Route>
      </Routes>
    </>
  )
}

export default App
