import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

import BlogService from '../service/blogService'

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const getInfoUser = (state, action) => {
  const { token, username, email, image } = action.payload.user
  localStorage.setItem('token', token)

  state.token = token
  state.username = username
  state.email = email
  state.image = image
}

const authenticationSlice = createSlice({
  name: 'authentication',

  initialState: {
    token: localStorage.getItem('token'),
    errors: null,
    username: null,
    email: null,
    image: null,
  },

  reducers: (create) => ({
    fetchRegisterUser: create.asyncThunk(
      async function (user, { rejectWithValue }) {
        try {
          const data = await BlogService.postNewUser(user)
          if (data.status === 422) {
            const errors = await data.json()
            return rejectWithValue(errors)
          }
          return data
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => getInfoUser(state, action),
        rejected: (state, action) => {
          state.errors = action.payload.errors
        },
      }
    ),

    fetchLoginUser: create.asyncThunk(
      async function (user, { rejectWithValue }) {
        try {
          const data = await BlogService.postLoginUser(user)
          if (data.status === 422) {
            const errors = await data.json()
            return rejectWithValue(errors)
          }
          return data
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => getInfoUser(state, action),
        rejected: (state, action) => {
          state.errors = action.payload.errors
        },
      }
    ),

    logOutUser: create.reducer((state) => {
      localStorage.removeItem('token')
      state.token = null
      state.username = null
      state.email = null
      state.image = null
    }),

    fetchCurrentUser: create.asyncThunk(
      async function (token, { rejectWithValue }) {
        try {
          return BlogService.getCurrentUser(token)
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => getInfoUser(state, action),
      }
    ),

    fetchUpdateUser: create.asyncThunk(
      async function (user, { rejectWithValue }) {
        try {
          const data = await BlogService.updateCurrentUser(user)
          if (data.status === 422) {
            const errors = await data.json()
            return rejectWithValue(errors)
          }
          return data
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => getInfoUser(state, action),
        rejected: (state, action) => {
          state.errors = action.payload.errors
        },
      }
    ),
  }),

  selectors: {
    selectorToken: (state) => state.token,
    selectorUsername: (state) => state.username,
    selectorEmail: (state) => state.email,
    selectorImage: (state) => state.image,
    selectorPassword: (state) => state.password,
    selectorErrors: (state) => state.errors,
  },
})

export const { fetchRegisterUser, fetchLoginUser, logOutUser, fetchCurrentUser, fetchUpdateUser } =
  authenticationSlice.actions

export const { selectorToken, selectorUsername, selectorEmail, selectorImage, selectorErrors } =
  authenticationSlice.selectors

export default authenticationSlice.reducer
