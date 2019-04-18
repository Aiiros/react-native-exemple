// @flow

import config from '../lib/config';


const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';


const fetchWeatherData = () => (
  fetch(config.API_URL)
    .then((res) => res.json())
    .then((data) => data.currently)
    .catch((err) => err)
);


export const fetchData = () => (
  (dispatch: Function) => {
    dispatch(fetchDataRequest());
    return fetchWeatherData()
      .then((weatherInfo) => dispatch(fetchDataSuccess(weatherInfo)))
      .catch(() => dispatch(fetchDataError()));
  }
);

const fetchDataRequest = () => (
  {
    type: FETCH_DATA_REQUEST,
    payload: {
      isLoading: true
    },
  }
);

const fetchDataSuccess = (weatherInfo: Object) => (
  {
    type: FETCH_DATA_SUCCESS,
    payload: {
      weatherInfo,
      isLoading: false
    },
  }
);


const fetchDataError = () => (
  {
    type: FETCH_DATA_ERROR,
    payload: {
      error: true,
      weatherInfo: null,
      isLoading: false
    },
  }
);

