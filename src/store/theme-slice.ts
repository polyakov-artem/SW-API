import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {},
});

export default slice.reducer;
