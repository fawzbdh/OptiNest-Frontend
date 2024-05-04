import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:8000/api/project'; // Define baseURL
export const fetchProjects = createAsyncThunk('project/fetchProjects', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseURL}`, {
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
export const fetchprojectByUserId = createAsyncThunk('project/fetchprojectbyuserid', async (_, thunkAPI) => {
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
export const fetchProjectById = createAsyncThunk('project/fetchProjectById', async (projectId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseURL}/${projectId}`, {
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
export const deleteProject = createAsyncThunk('project/deleteProject', async (projectId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    // Send a DELETE request to the server to delete the project
    await axios.delete(`${baseURL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Return the deleted project ID as the result
    return projectId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: [],
    getalldata: [],
    selectedProject: null,
    status: null,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch projects
      .addCase(fetchprojectByUserId.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchprojectByUserId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchprojectByUserId.rejected, (state, action) => {
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
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.selectedProject = action.payload;
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        // Remove the deleted project from the state
        state.data = state.data.filter((project) => project.id !== action.payload);
        state.status = 'success';
        state.error = null;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default projectSlice.reducer;
