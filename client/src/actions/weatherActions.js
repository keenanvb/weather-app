import axios from 'axios'
import { GET_WEATHER_DATA } from './types';
import { setAlert } from './index'
import store from '../store'

export const getWeatherCurrentData = () => {
    return async (dispatch) => {

        try {
            let data = await retryApiCall(callApi, 2);

            dispatch({
                type: GET_WEATHER_DATA,
                payload: { current: data.current, forcast: data.forcast }
            });

            if (data) {
                if (data.current.main.temp < 15) {
                    store.dispatch(setAlert('Warning Temp below 15', 'danger'))
                }
                if (data.current.main.temp > 25) {
                    store.dispatch(setAlert('Warning Temp above 25', 'danger'))
                }
            }

            dispatch(setAlert('Weather available', 'success'));



        } catch (err) {
            // dispatch(setAlert(`No Weather data`, 'danger'))
            console.log('err', err)
        }
    }
}

let callApi = async () => {
    const result = await axios.get(`/api/weather`);
    const { current, forcast } = result.data

    if (current && forcast) {
        return {
            current, forcast
        }
    }
    throw new Error('Failed')
}

let retryApiCall = async (fn, count) => {
    //2, 4, 8, 16,
    let delay = 1000 * count
    try {
        return await fn();
    } catch (e) {
        setTimeout(async () => {
            store.dispatch(setAlert(`Call API`, 'danger'))
            if (count >= 2) {
                let increaseCount = count * 2
                return await retryApiCall(callApi, increaseCount);
            }
        }, delay)
    }
}