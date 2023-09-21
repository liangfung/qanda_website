import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface IAuthState {
  userInfo?: {
    userId: number | undefined
    userName: string | undefined
  }
}

const initialState: IAuthState = {
  userInfo: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IAuthState['userInfo']>) => {
      state.userInfo = action.payload
    },
  },
})

export const { setUserInfo } = authSlice.actions

export const authReducer = authSlice.reducer

export const userInfoSelector = (state: RootState) => state?.auth?.userInfo
