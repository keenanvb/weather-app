import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../layout/Loading'
import { getWeatherCurrentData } from '../../actions'
import moment from 'moment'
import { CtoF, degToCompassPoint } from '../../utils/utils'


const Weather = ({ weather: { current, forcast, loading }, getWeatherCurrentData }) => {
    const mounted = useRef(false);
    const [flag, setFlag] = useState(false);


    useEffect(() => {
        getWeatherCurrentData()
        mounted.current = true;
    }, []);

    // setInterval(() => {
    //     getWeatherCurrentData()
    // }, 1000 * 60 * 20);


    return (
        <>
            {current == null && loading ? <Loading /> :
                <>
                    <div className="weather-side">
                        <div className="weather-gradient" />
                        <div className="date-container">
                            <h2 className="date-day">
                                {moment(current.dt * 1000).format('dddd')}
                            </h2>
                            <span className="date-day-full">
                                {moment(current.dt * 1000).format("Do MMM YYYY")}
                            </span>
                            <div>
                                {current.name}
                            </div>
                        </div>
                        <div className="weather-container">
                            <img className="weather-icon" src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}></img>
                            <div className="weather-temp">{CtoF(current.main.temp, flag)}</div>
                            <div className="weather-desc">
                                {current.weather[0].main}:
                            <span> {current.weather[0].description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="info-side">
                        <input style={{ left: '40px' }} type="checkbox" name="check" checked={flag} onChange={() => { setFlag(!flag) }} />
                        <div className="today-info">
                            <div className=" today-sunrise">
                                <div className="title">Sunrise</div>
                                <div className="value">{moment(current.sys.sunrise * 1000).format('h:mm:ss a')}</div>
                            </div>
                            <div className="today-sunset">
                                <div className="title">Sunset</div>
                                <div className="value">{moment(current.sys.sunset * 1000).format('h:mm:ss a')}</div>
                            </div>
                            <div className="today-humidity">
                                <div className="title">Humidity</div>
                                <div className="value">{current.main.humidity}%</div>
                            </div>
                            <div className="today-pressure">
                                <div className="title">Pressure</div>
                                <div className="value">{current.main.pressure}hpa</div>
                            </div>
                            <div className="today-wind">
                                <div className="title">Wind</div>
                                <div className="value">{current.wind.speed} - {degToCompassPoint(current.wind.deg)}</div>
                            </div>
                        </div>
                        {forcast != null ?
                            <div className="week-container">
                                <ul className="week-list">
                                    {forcast !== null && forcast.list.length > 0 ?
                                        <>
                                            {forcast.list.map((weather, index) => {
                                                return (
                                                    <li key={index}>
                                                        <img className="day-icon" src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
                                                        <span className="day-name">{moment(weather.dt * 1000).format('ddd')}</span>
                                                        <span className="day-temp-max">{CtoF(weather.temp.max, flag)}</span>
                                                        <span className="day-temp-min">{CtoF(weather.temp.min, flag)}</span>
                                                        <span className="day-wind-direction">{weather.speed} {degToCompassPoint(weather.deg)}</span>
                                                    </li>
                                                )
                                            })}
                                        </> : null}
                                </ul>
                            </div> : null
                        }

                    </div>
                </>
            }
        </>
    )
}

Weather.propTypes = {
    getUserData: PropTypes.func.isRequired,
    getWeatherForcastData: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired,
    forcast: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather,
    }
}

export default connect(mapStateToProps, { getWeatherCurrentData })(Weather);
