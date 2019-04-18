import { combineReducers } from 'redux';

const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

const initialState = {
  weatherInfo: {},
  isLoading: false,
  error: false,
};

const weatherReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS: {
      return {
        isLoading: false,
        error: false,
        weatherInfo: action.payload.weatherInfo,
      };
    }
    case FETCH_DATA_REQUEST: {
      return {
        isLoading: true,
        error: false,
        weatherInfo: {},
      };
    }
    case FETCH_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
