import { GET_WEATHER_DATA } from '../actions/types';

const INITIAL_STATE = {
    current: null,
    forcast: null,
    loading: true,
    error: {}
};

export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_WEATHER_DATA:
            return { ...state, current: payload.current, forcast: payload.forcast, loading: false }
        default:
            return state;
    }
}