import { API_URL } from '../config';
import axios from 'axios';

//selectors
export const getUser = ({ user }) => user.data;

// export const getUserById = ({ users }, userId) =>
//   users.data.find((user) => user._id === userId);

export const getRequest = ({ user }) => user.request;

/* ACTIONS */

//actions
const reducerName = 'user';
// eslint-disable-next-line no-unused-vars
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_USER = createActionName('LOAD_USER');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = () => ({ type: ERROR_REQUEST });

export const loadUser = (payload) => ({ payload, type: LOAD_USER });

/* THUNKS */

// const options = {
//   method: 'GET',
//   credentials: 'include'
// };

// fetch(`localhost:8000/auth/user`, options)
// .then((res) => {
// console.log('logged in?', res);
// });

export const loadUserRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`localhost:8000/auth/user`, {
        withCredentials: true,
      });

      dispatch(loadUser(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

// export const loadUserRequest = () => {
//   return async (dispatch) => {
//     dispatch(startRequest());
//     try {
//       let res = await axios.get(`localhost:8000/auth/user`);

//       dispatch(loadUser(res.data));
//       dispatch(endRequest());
//     } catch (e) {
//       dispatch(errorRequest(e.message));
//     }
//   };
// };

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

export default function usersReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER:
      return { ...statePart, data: [...action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: action.error, success: false },
      };
    default:
      return statePart;
  }
}
