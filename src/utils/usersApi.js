import axios from 'axios';
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  createUserFailure,
  createUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  updateUserFailure,
  updateUserSuccess,
  updateUserRequest
} from 'store/reducers/userReducer';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:8000/api'; // Replace with your API endpoint

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

// Retrieve access token from storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Intercept requests to add authorization header (if token is available)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUsersRequest());

  try {
    const response = await axiosInstance.get('/user'); // Replace with your endpoint
    dispatch(fetchUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error || 'An error occurred while fetching user data'));
  }
};
export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    dispatch(createUserSuccess(response.data));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Extract the first error message from the API response
      dispatch(createUserFailure(Object.values(error.response.data.errors)[0][0] || 'An error occurred while creating user'));
    }
  }
};
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/${userId}`); // Replace with your endpoint
    dispatch(deleteUserSuccess(userId)); // Dispatch success action with userId as payload
  } catch (error) {
    dispatch(deleteUserFailure(error || 'An error occurred while deleting user'));
  }
};
export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(updateUserRequest());

  try {
    const response = await axiosInstance.put(`/user/${userId}`, userData);
    dispatch(updateUserSuccess(response.data));
    // Optionally, display a success message with SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'User updated successfully'
    });
  } catch (error) {
    let errorMessage = 'An error occurred';
    if (error.response && error.response.data && error.response.data.errors) {
      // Extract the first error message from the API response
      errorMessage = error.response.data.errors[0].msg;
      dispatch(updateUserFailure(errorMessage));
      // Display error message with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage
      });
    } else {
      let errorMessage = 'An error occurred';
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = error.response.data.errors[0].msg;
      }
      console.log('Error message:', errorMessage);
      dispatch(updateUserFailure(errorMessage));
      // Display generic error message with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage
      });
    }
  }
};
