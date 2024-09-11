import { Routes, Route } from 'react-router-dom'

import Header from '../header'
import Main from '../main'
import SingleArticle from '../singleArticle'

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Main /> */}
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="articles" element={<Main />} />
          <Route path="articles/:slug" element={<SingleArticle />} />
          {/* <Route path="*" element={<NotFoundPage />} /> Создать этот компонент*/}
        </Route>
      </Routes>
    </>
  )
}

export default App
