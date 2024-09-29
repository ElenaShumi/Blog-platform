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
    page: 1,
    status: null,
    error: null,
  },

  reducers: (create) => ({
    stopLoading: create.reducer((state) => {
      state.status = 'resolved'
    }),

    editPages: create.reducer((state, page) => {
      state.page = page
    }),

    fetchArticles: create.asyncThunk(
      async function (parameters, { rejectWithValue }) {
        try {
          return await BlogService.getArticles(parameters)
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
          console.log(info)
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
        fulfilled: (state) => {
          state.status = 'resolved'
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

    fetchFavoriteAnArticle: create.asyncThunk(
      async function (info, { rejectWithValue }) {
        try {
          const res = await BlogService.favoriteAnArticle(info)
          return res
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => {
          state.singleArticle = action.payload.article
        },
        rejected: (state, action) => {
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
    selectorFavoriteArticles: (state) => state.favoriteArticles,
    selectorPage: (state) => state.page,
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
  editPages,
} = articlesSlice.actions

export const {
  selectorArticles,
  selectorStatus,
  selectorArticlesCount,
  selectorSingleArticle,
  selectorFavoriteArticles,
  selectorPage,
} = articlesSlice.selectors
export default articlesSlice.reducer
