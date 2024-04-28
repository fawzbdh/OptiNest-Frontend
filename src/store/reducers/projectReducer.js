import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/project'; // Define baseURL

export const fetchproject = createAsyncThunk('project/fetchproject', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseURL}/byUserId`, {
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

export const createProject = createAsyncThunk('project/createProject', async (projectData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(baseURL, projectData, {
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

// Add updateProject action
export const updateProject = createAsyncThunk('project/updateProject', async ({ id, ...projectData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`${baseURL}/${id}`, projectData, {
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

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: [],
    getalldata: [],
    status: null,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchproject.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchproject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchproject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create project
      .addCase(createProject.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'success';
        state.error = null;
      })
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update project
      .addCase(updateProject.fulfilled, (state, action) => {
        // Find the project by ID and update its data
        const index = state.data.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.status = 'success';
        state.error = null;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default projectSlice.reducer;
