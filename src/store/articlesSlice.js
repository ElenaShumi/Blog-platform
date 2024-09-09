import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const articlesSlice = createSlice({
  name: 'articles',

  initialState: {
    articles: [],
    articlesCount: null,
    status: null,
    error: null,
  },

  reducers: (create) => ({
    stopLoading: create.reducer((state) => {
      state.status = 'resolved'
    }),

    fetchArticles: create.asyncThunk(
      async function (count = 0, { rejectWithValue }) {
        try {
          const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${count}`)

          if (!response.ok) {
            throw new Error('Server Error!')
          }

          const data = await response.json()

          return data
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        pending: (state) => {
          state.status = 'loading'
          state.error = null
        },
        fulfilled: (state, action) => {
          state.status = 'resolved'
          state.articles = action.payload.articles
          state.articlesCount = action.payload.articlesCount
        },
        rejected: (state, action) => {
          state.status = 'rejected'
          state.error = action.payload
        },
      }
    ),
  }),

  selectors: {
    selectorArticles: (state) => state.articles,
    selectorStatus: (state) => state.status,
    selectorArticlesCount: (state) => state.articlesCount,
  },
})

export const { stopLoading, fetchArticles } = articlesSlice.actions

export const { selectorArticles, selectorStatus, selectorArticlesCount } = articlesSlice.selectors

export default articlesSlice.reducer
