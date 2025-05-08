import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoggedIn: false,
    isUserProfile: false,
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsUserProfile: state => state.isUserProfile,
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsUserProfile: create.reducer<{ isUserProfile: boolean }>((state, action) => {
      state.isUserProfile = action.payload.isUserProfile
    }),
  }),
})

export const { setIsLoggedIn, setIsUserProfile } = appSlice.actions
export const { selectIsLoggedIn, selectIsUserProfile } = appSlice.selectors
export const appReducer = appSlice.reducer
