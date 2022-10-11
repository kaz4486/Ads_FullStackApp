//selectors
export const getUser = ({ users }) => users;

// export const getUserById = ({ users }, userId) =>
//   users.data.find((user) => user._id === userId);

/* ACTIONS */

//actions
const reducerName = 'users';
// eslint-disable-next-line no-unused-vars
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;
const LOG_IN = createActionName('LOG_IN');

// actions creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

/* REDUCER */

export default function usersReducer(statePart = null, action) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    default:
      return statePart;
  }
}
