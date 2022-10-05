//selectors

/* ACTIONS */

//actions
const reducerName = 'ads';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

export default function adsReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
