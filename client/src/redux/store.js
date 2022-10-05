import { createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';

//import reducers
import adsReducer from './adsRedux';

const subreducers = { ads: adsReducer };

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //   compose(
  //     applyMiddleware(thunk),
  //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
