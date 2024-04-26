import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // Change to an array to hold multiple users
  loading: false,
  error: null,
  errorCreate: null,
  statusCreate: null, // Add status field to hold HTTP status codes
  errorDelete: null,
  statusDelete: null,

  status: null // Add status field to hold HTTP status codes
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.status = null; // Reset status when making a new request
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload; // Set the array of users from the action payload
      state.status = 200; // Set status to 200 for success
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
      state.status = action.payload?.response?.status; // Set status from payload
    },
    createUserSuccess: (state) => {
      state.loading = false;
      state.statusCreate = 201; // Set status to 200 for success
      state.errorCreate = null; // Set status to 200 for success

      // Optionally, you can update state with the newly created article
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.errorCreate = action.payload;
      state.statusCreate = 400; // Set status from payload
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.statusDelete = 204; // Set status to 204 for success
      state.errorDelete = null; // Reset error for success
      // Remove the deleted user from the users array
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.errorDelete = action.payload;
      state.statusDelete = 400; // Set status from payload
    }
  }
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserSuccess,
  createUserFailure,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;
