import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/fichier';

// Create csv async thunk
export const createCsv = createAsyncThunk('csv/createCsv', async ({ projectId }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(baseURL + '/csv/' + projectId, {
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

export const csvSlice = createSlice({
  name: 'csv',
  initialState: {
    csvs: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCsv.fulfilled, (state, action) => {
        state.csvs.push(action.payload);
        state.status = 'success';
        state.error = null;
      })
      .addCase(createCsv.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCsv.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default csvSlice.reducer;
