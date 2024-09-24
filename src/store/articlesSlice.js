import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

import BlogService from '../service/blogService'

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

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
          console.log('Запрос')
          return await BlogService.getArticles(count)
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
          console.log(action.payload.articles)
        },
        rejected: (state, action) => {
          state.status = 'rejected'
          state.error = action.payload
          console.log('ops! create error')
        },
      }
    ),

    fetchSingleArticle: create.asyncThunk(
      async function (slug, { rejectWithValue }) {
        try {
          return await BlogService.getSingleArticle(slug)
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

    fetchCreateArticle: create.asyncThunk(
      async function (info, { rejectWithValue }) {
        try {
          return await BlogService.createAnArticle(info)
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

    fetchUpdateArticle: create.asyncThunk(
      async function (info, { rejectWithValue }) {
        try {
          return await BlogService.updateAnArticle(info)
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
          console.log(action.payload.article)
        },
        rejected: (state, action) => {
          state.status = 'rejected'
          state.error = action.payload
        },
      }
    ),

    fetchDeleteArticle: create.asyncThunk(async function (info, { rejectWithValue }) {
      try {
        return await BlogService.deleteAnArticle(info)
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }),
  }),

  selectors: {
    selectorArticles: (state) => state.articles,
    selectorSingleArticle: (state) => state.singleArticle,
    selectorStatus: (state) => state.status,
    selectorArticlesCount: (state) => state.articlesCount,
  },
})

export const {
  stopLoading,
  fetchArticles,
  fetchSingleArticle,
  fetchCreateArticle,
  fetchUpdateArticle,
  fetchDeleteArticle,
} = articlesSlice.actions

export const { selectorArticles, selectorStatus, selectorArticlesCount, selectorSingleArticle } =
  articlesSlice.selectors
export default articlesSlice.reducer
