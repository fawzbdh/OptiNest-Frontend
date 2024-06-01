import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

const baseURL = '/resultat'; // Define baseURL

export const fetchResultatByProjectId = createAsyncThunk('resultat/fetchResultatByProjectId', async (projectId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.get(`${baseURL}/byProjectId/${projectId}`, {
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

export const resultatSlice = createSlice({
  name: 'resultat',
  initialState: {
    resultat: null,
    loading: false,
    error: null,
    resultats: []
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch resultats by project ID
      .addCase(fetchResultatByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.resultats = action.payload;
      })
      .addCase(fetchResultatByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultatByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default resultatSlice.reducer;
