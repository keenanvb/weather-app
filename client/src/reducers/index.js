import { combineReducers } from 'redux';
import alertReducer from './alertReducer'
import weatherReducer from './weatherReducer'


export default combineReducers({
    alert: alertReducer,
    weather: weatherReducer
})