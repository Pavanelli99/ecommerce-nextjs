import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  initialState: {
    correntUser: null,

  },
  name: 'user',
  reducers: {
    SetCorrentUser: (state, action) => {
      state.correntUser = action.payload
    }
  }

})

export const { SetCorrentUser } = userSlice.actions;