import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const url = 'https://blog.kata.academy/api/articles'

const articlesSlice = createSlice({
  name: 'articles',

  initialState: {
    articles: [],
    singleArticle: null,
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
          const response = await fetch(`${url}?limit=5&offset=${count}`)

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

    fetchSingleArticle: create.asyncThunk(
      async function (slug, { rejectWithValue }) {
        try {
          const response = await fetch(`${url}/${slug}`)

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
          state.singleArticle = action.payload.article
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
    selectorSingleArticle: (state) => state.singleArticle,
    selectorStatus: (state) => state.status,
    selectorArticlesCount: (state) => state.articlesCount,
  },
})

export const { stopLoading, fetchArticles, fetchSingleArticle } = articlesSlice.actions

export const { selectorArticles, selectorStatus, selectorArticlesCount, selectorSingleArticle } =
  articlesSlice.selectors
export default articlesSlice.reducer
