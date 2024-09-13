import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

import BlogService from '../service/blogService'

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const getInfoUser = (state, action) => {
  const { token, username, email } = action.payload
  state.token = token
  state.username = username
  state.email = email
}

const authenticationSlice = createSlice({
  name: 'authentication',

  initialState: {
    token: null,
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
          console.log(user)
          return BlogService.postLoginUser(user)
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
  },
})

export const { fetchRegisterUser, fetchLoginUser } = authenticationSlice.actions

export const { selectorToken } = authenticationSlice.selectors

export default authenticationSlice.reducer
