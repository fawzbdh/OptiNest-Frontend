import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

const baseURL = '/format'; // Define baseURL
export const fetchFormats = createAsyncThunk('format/fetchFormats', async (_, thunkAPI) => {
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
export const fetchformatByUserId = createAsyncThunk('format/fetchformatbyuserid', async (_, thunkAPI) => {
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
export const fetchFormatById = createAsyncThunk('format/fetchFormatById', async (formatId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.get(`${baseURL}/${formatId}`, {
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

export const createFormat = createAsyncThunk('format/createFormat', async ({ id, ...formatData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.post(
      baseURL,
      {
        ...formatData,
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
export const updateMultipleFormats = createAsyncThunk('formats/updateMultipleFormats', async (formats, thunkAPI) => {
  try {
    const response = await api.put(`${baseURL}/updateMultiple`, formats, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// Add updateFormat action
export const updateFormat = createAsyncThunk('format/updateFormat', async ({ id, ...formatData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.put(`${baseURL}/${id}`, formatData, {
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
export const fetchFormatByProjectId = createAsyncThunk('format/fetchFormatByProjectId', async (projectId, thunkAPI) => {
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
export const deleteFormat = createAsyncThunk('format/deleteFormat', async (formatId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    // Send a DELETE request to the server to delete the format
    const response = await api.delete(`${baseURL}/${formatId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Return the deleted format ID as the result
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const createMultipleFormats = createAsyncThunk('format/createMultipleFormats', async ({ projectId, formatsData }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.post(
      `${baseURL}/multiple/${projectId}`,
      { formatsData },
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

export const formatSlice = createSlice({
  name: 'format',
  initialState: {
    format: null,
    loading: false,
    error: null,
    formats: []
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFormats.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.formats = action.payload;
      })
      .addCase(fetchFormats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch formats
      .addCase(fetchformatByUserId.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.formats = action.payload;
      })
      .addCase(fetchformatByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchformatByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create format
      .addCase(createFormat.fulfilled, (state, action) => {
        state.loading = false;
        // Update users array with the newly signed-up user
        state.formats.push(action.payload);
        state.format = action.payload;
      })
      .addCase(createFormat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFormat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update format
      .addCase(updateFormat.fulfilled, (state, action) => {
        // Find the format by ID and update its data
        state.loading = false;
        // Update the user in the users array with the updated user data
        state.formats = state.formats.map((format) => (format.id === action.payload.id ? action.payload : format));
      })
      .addCase(updateFormat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFormat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFormatById.fulfilled, (state, action) => {
        state.loading = false;
        state.format = action.payload; // Set the current user as well
      })
      .addCase(fetchFormatById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormatById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch formats by project ID
      .addCase(fetchFormatByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.formats = action.payload;
      })
      .addCase(fetchFormatByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormatByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMultipleFormats.fulfilled, (state, action) => {
        state.loading = false;
        state.formats.push(...action.payload); // Add the new formats to the state
      })
      .addCase(createMultipleFormats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMultipleFormats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFormat.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the users array
        state.formats = state.formats.filter((format) => format.id !== action.payload.id);
      })
      .addCase(deleteFormat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFormat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default formatSlice.reducer;
