import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  client: {toggleForm: false}
}

export const ReducerSlice = createSlice({
  name: 'crudapp',
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      // get the current state and return the opposite state
      state.client.toggleForm = !state.client.toggleForm
    }
  }
})

//get the action with destructuring
export const { toggleChangeAction } = ReducerSlice.actions

export default ReducerSlice.reducer