import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

const baseURL = '/project'; // Define baseURL
export const fetchProjects = createAsyncThunk('project/fetchProjects', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.get(`${baseURL}`, {
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
    const res = await api.get(`${baseURL}/byUserId`, {
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
    const res = await api.get(`${baseURL}/${projectId}`, {
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
    const res = await api.post(baseURL, projectData, {
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
    const res = await api.put(`${baseURL}/${id}`, projectData, {
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
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    // Send a DELETE request to the server to delete the project
    const response = await api.delete(`${baseURL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Return the deleted project ID as the result
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: null,
    loading: false,
    error: null,
    projects: []
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.projects = action.payload;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch projects
      .addCase(fetchprojectByUserId.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.projects = action.payload;
      })
      .addCase(fetchprojectByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchprojectByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create project
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        // Update users array with the newly signed-up user
        state.projects.push(action.payload);
        state.project = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update project
      .addCase(updateProject.fulfilled, (state, action) => {
        // Find the project by ID and update its data
        state.loading = false;
        state.project = action.payload; // Set the current user as well
        // Update the user in the users array with the updated user data
        state.projects = state.projects.map((project) => (project.id === action.payload.id ? action.payload : project));
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload; // Set the current user as well
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the users array
        state.projects = state.projects.filter((project) => project.id !== action.payload.id);
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default projectSlice.reducer;
