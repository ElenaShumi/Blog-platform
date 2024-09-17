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
    username: null,
    email: null,
    image: null,

    // loading:
  },

  reducers: (create) => ({
    fetchRegisterUser: create.asyncThunk(
      async function (user, { rejectWithValue }) {
        try {
          console.log(user)
          return BlogService.postNewUser(user)
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => getInfoUser(state, action),
      }
    ),

    fetchLoginUser: create.asyncThunk(
      async function (user, { rejectWithValue }) {
        try {
          return BlogService.postLoginUser(user)
        } catch (error) {
          return rejectWithValue(error.message)
        }
      },
      {
        fulfilled: (state, action) => getInfoUser(state, action),
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
  }),

  selectors: {
    selectorToken: (state) => state.token,
    selectorUsername: (state) => state.username,
    selectorEmail: (state) => state.email,
    selectorImage: (state) => state.image,
  },
})

export const { fetchRegisterUser, fetchLoginUser, logOutUser, fetchCurrentUser } = authenticationSlice.actions

export const { selectorToken, selectorUsername, selectorEmail, selectorImage } = authenticationSlice.selectors

export default authenticationSlice.reducer
