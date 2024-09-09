import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesSlice'

export default configureStore({
  reducer: {
    articles: articlesSlice,
  },
})
