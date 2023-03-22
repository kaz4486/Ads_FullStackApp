import { API_URL } from '../configs/config';
import axios from 'axios';

//selectors
export const getAds = ({ ads }) => ads.data;

export const getAdById = ({ ads }, adId) => {
  // console.log(ads); // dlaczego X8?
  return ads.data.find((ad) => ad._id === adId);
};

export const getRequest = ({ ads }) => ads.request;

export const getStatus = ({ ads }) => ads.status;
/* ACTIONS */

//actions
const reducerName = 'ads';
// eslint-disable-next-line no-unused-vars
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const CREATE_AD = createActionName('CREATE_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

const SET_STATUS = createActionName('SET_STATUS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = () => ({ type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const createAd = (payload) => ({ payload, type: CREATE_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });
export const removeAd = (payload) => ({ payload, type: REMOVE_AD });
export const setStatus = (payload) => ({ payload, type: SET_STATUS });
/* THUNKS */

export const createAddRequest = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch(startRequest({ name: CREATE_AD })); //po co to name?
    try {
      let res = await axios.post(
        `${API_URL}/ads`,
        data,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      dispatch(createAd(res.data));
      dispatch(setStatus(res.status));
      dispatch(endRequest({ name: CREATE_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: CREATE_AD, error: e.message }));
    }
  };
};

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/ads`);

      dispatch(loadAds(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadSearchedAdsRequest = (searchPhrase) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`);

      dispatch(loadAds(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const editAdRequest = (data, id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: EDIT_AD })); //po co to name?
    try {
      let res = await axios.put(
        `${API_URL}/ads/${id}`,
        data,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      dispatch(editAd(res.data));
      dispatch(endRequest({ name: EDIT_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: EDIT_AD, error: e.message }));
    }
  };
};

export const removeAdRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: EDIT_AD })); //po co to name?
    try {
      await axios.delete(
        `${API_URL}/ads/${id}`,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      await dispatch(removeAd(id));
      dispatch(endRequest({ name: EDIT_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: EDIT_AD, error: e.message }));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  request: { pending: false, error: null, success: null },
  status: null,
};

/* REDUCER */
// dlaczego akcja jest obiektem?
export default function adsReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case CREATE_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case EDIT_AD:
      return {
        ...statePart,
        data: [
          statePart.data.map((ad) =>
            ad._id === action.payload._id ? { ...ad, ...action.payload } : ad
          ),
        ],
      };
    case REMOVE_AD:
      return {
        ...statePart,
        data: [statePart.data.filter((ad) => ad._id !== action.payload)],
      };
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
    case SET_STATUS:
      return { ...startRequest, status: action.payload };
    default:
      return statePart;
  }
}
