import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

import BlogService from '../service/blogService'

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const articlesSlice = createSlice({
  name: 'articles',

  initialState: {
    articles: [],
    favoriteArticles: [],
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
      async function (parameters, { rejectWithValue }) {
        try {
          console.log('Запрос')
          // const favoriteAnArticle = await BlogService.getFavoriteArticles(parameters)
          const allArticles = await BlogService.getArticles(parameters)
          return allArticles
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
          // state.favoriteArticles = action.payload.favoriteAnArticle.articles
          state.articlesCount = action.payload.articlesCount
          console.log(action.payload)
        },
        rejected: (state, action) => {
          state.status = 'rejected'
          state.error = action.payload
          console.log('ops! create error')
        },
      }
    ),

    fetchSingleArticle: create.asyncThunk(
      async function (obj, { rejectWithValue }) {
        try {
          return await BlogService.getSingleArticle(obj)
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

    fetchFavoriteAnArticle: create.asyncThunk(async function (info, { rejectWithValue }) {
      try {
        return await BlogService.favoriteAnArticle(info)
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
    selectorFavoriteArticles: (state) => state.favoriteArticles,
  },
})

export const {
  stopLoading,
  fetchArticles,
  fetchSingleArticle,
  fetchCreateArticle,
  fetchUpdateArticle,
  fetchDeleteArticle,
  fetchFavoriteAnArticle,
} = articlesSlice.actions

export const {
  selectorArticles,
  selectorStatus,
  selectorArticlesCount,
  selectorSingleArticle,
  selectorFavoriteArticles,
} = articlesSlice.selectors
export default articlesSlice.reducer
