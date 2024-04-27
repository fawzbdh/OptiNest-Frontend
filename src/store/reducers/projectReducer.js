import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchproject = createAsyncThunk(
  'project/fetchproject',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8000/api/project`);
      const data = await res.json();
      console.log(data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: [],
    getalldata: [],
    status: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // show hotels
      .addCase(fetchproject.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchproject.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchproject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
