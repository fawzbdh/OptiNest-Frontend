// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'utils/api';
const baseURL = '/feedback';
export const addfeedback = createAsyncThunk('feedback/createFeedback', async (feedbackData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.post(baseURL, feedbackData, {
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
export const getfeedback = createAsyncThunk('feedback/getFeedback', async (feedbackData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const token = localStorage.getItem('token');
    const res = await api.get(baseURL + '/byProjectId/' + feedbackData.projectid, {
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
export const deletefeedack = createAsyncThunk('feedback/deletefeedback', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    const response = await api.delete(baseURL + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const updateFeedback = createAsyncThunk('feedback/updaterFeedback', async ({ id, feedbackData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    const response = await api.put(baseURL + '/' + id, feedbackData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedback: null,
    loading: false,
    error: null,
    feedbacks: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addfeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addfeedback.fulfilled, (state, action) => {
        state.feedbacks = [...state.feedbacks, action.payload];
        state.loading = false;
        // Update users array with the newly signed-up user
        state.feedback = action.payload; // Set the current user as well
      })
      .addCase(addfeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getfeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getfeedback.fulfilled, (state, action) => {
        state.loading = false;
        // Handle fetched users data
        state.feedbacks = action.payload;
      })
      .addCase(getfeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletefeedack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletefeedack.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the users array
        state.feedbacks = state.feedbacks.filter((feedback) => feedback.id !== action.payload.id);
      })
      .addCase(deletefeedack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user in the users array with the updated user data
        state.feedbacks = state.feedbacks.map((user) => (user.id === action.payload.id ? action.payload : user));
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default feedbackSlice.reducer;
