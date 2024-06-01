import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/fichier';

// Create optimisation async thunk
export const createOptimisation = createAsyncThunk('optimisation/createOptimisation', async ({ projectId }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(baseURL + '/optimisation/' + projectId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = res.data.data;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const optimisationSlice = createSlice({
  name: 'optimisation',
  initialState: {
    optimisations: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOptimisation.fulfilled, (state, action) => {
        state.optimisations.push(action.payload);
        state.status = 'success';
        state.error = null;
      })
      .addCase(createOptimisation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOptimisation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default optimisationSlice.reducer;
