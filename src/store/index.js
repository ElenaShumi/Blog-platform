import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articlesSlice'
import authenticationSlice from './authenticationSlice'

export default configureStore({
  reducer: {
    articles: articlesSlice,
    authentication: authenticationSlice,
  },
})
