import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/fichier';

// Create fichier async thunk
export const createFichier = createAsyncThunk('fichier/createFichier', async ({ files, projectId }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('projectId', projectId);
    files.forEach((file) => formData.append('files', file));
    const res = await axios.post(baseURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    const data = res.data.data;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Fetch fichiers by project ID async thunk
export const fetchFichiersByProjectId = createAsyncThunk('fichier/fetchFichiersByProjectId', async (projectId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseURL}/byProjectId/${projectId}`, {
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

// Update quantity async thunk
export const updateQuantity = createAsyncThunk('fichier/updateQuantity', async ({ fileId, quantity }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(
      `${baseURL}/${fileId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = res.data.data;
    return { fileId, quantity: data.quantity };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update priority async thunk
export const updatePriority = createAsyncThunk('fichier/updatePriority', async ({ fileId, priority }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(
      `${baseURL}/${fileId}`,
      { priority },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = res.data.data;
    return { fileId, priority: data.priority };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
// Delete fichier async thunk
export const deleteFichier = createAsyncThunk('fichier/deleteFichier', async (fileId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${baseURL}/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return fileId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fichierSlice = createSlice({
  name: 'fichier',
  initialState: {
    files: [],

    status: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFichier.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.files.push(...action.payload);
        } else {
          state.files.push(action.payload);
        }
        state.status = 'success';
        state.error = null;
      })
      .addCase(createFichier.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createFichier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFichiersByProjectId.fulfilled, (state, action) => {
        state.files = action.payload;
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchFichiersByProjectId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFichiersByProjectId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { fileId, quantity } = action.payload;
        const fileToUpdate = state.files.find((file) => file.id === fileId);
        if (fileToUpdate) {
          fileToUpdate.quantity = quantity;
        }
        state.status = 'success';
        state.error = null;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updatePriority.fulfilled, (state, action) => {
        const { fileId, priority } = action.payload;
        const fileToUpdate = state.files.find((file) => file.id === fileId);
        if (fileToUpdate) {
          fileToUpdate.priority = priority;
        }
        state.status = 'success';
        state.error = null;
      })
      .addCase(updatePriority.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePriority.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteFichier.fulfilled, (state, action) => {
        state.files = state.files.filter((file) => file.id !== action.payload);
        state.status = 'success';
        state.error = null;
      })
      .addCase(deleteFichier.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteFichier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default fichierSlice.reducer;
