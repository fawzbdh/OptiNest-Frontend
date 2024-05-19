import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

const baseURL = '/container'; // Define baseURL
export const fetchContainers = createAsyncThunk('container/fetchContainers', async (_, thunkAPI) => {
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
export const fetchcontainerByUserId = createAsyncThunk('container/fetchcontainerbyuserid', async (_, thunkAPI) => {
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
export const fetchContainerById = createAsyncThunk('container/fetchContainerById', async (containerId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.get(`${baseURL}/${containerId}`, {
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

export const createContainer = createAsyncThunk('container/createContainer', async ({ id, ...containerData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.post(
      baseURL,
      {
        ...containerData,
        ProjectId: id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = res.data.data;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add updateContainer action
export const updateContainer = createAsyncThunk('container/updateContainer', async ({ id, ...containerData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.put(`${baseURL}/${id}`, containerData, {
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
export const fetchContainerByProjectId = createAsyncThunk('container/fetchContainerByProjectId', async (projectId, thunkAPI) => {
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
export const deleteContainer = createAsyncThunk('container/deleteContainer', async (containerId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    // Send a DELETE request to the server to delete the container
    const response = await api.delete(`${baseURL}/${containerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Return the deleted container ID as the result
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const containerSlice = createSlice({
  name: 'container',
  initialState: {
    container: null,
    loading: false,
    error: null,
    containers: []
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchContainers.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.containers = action.payload;
      })
      .addCase(fetchContainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch containers
      .addCase(fetchcontainerByUserId.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.containers = action.payload;
      })
      .addCase(fetchcontainerByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcontainerByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create container
      .addCase(createContainer.fulfilled, (state, action) => {
        state.loading = false;
        // Update users array with the newly signed-up user
        state.containers.push(action.payload);
        state.container = action.payload;
      })
      .addCase(createContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update container
      .addCase(updateContainer.fulfilled, (state, action) => {
        // Find the container by ID and update its data
        state.loading = false;
        // Update the user in the users array with the updated user data
        state.containers = state.containers.map((container) => (container.id === action.payload.id ? action.payload : container));
      })
      .addCase(updateContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContainerById.fulfilled, (state, action) => {
        state.loading = false;
        state.container = action.payload; // Set the current user as well
      })
      .addCase(fetchContainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch containers by project ID
      .addCase(fetchContainerByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.containers = action.payload;
      })
      .addCase(fetchContainerByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainerByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContainer.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the users array
        state.containers = state.containers.filter((container) => container.id !== action.payload.id);
      })
      .addCase(deleteContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default containerSlice.reducer;
