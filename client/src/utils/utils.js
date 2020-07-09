export const CtoF = (temp, flag) => {

    return flag ? `${((temp * 9 / 5) + 32).toFixed(2)} ℉` : `${temp} ℃`
}

export const degToCompassPoint = (degree) => {
    let val = Math.floor((degree / 22.5) + 0.5);
    let compassPoints = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return compassPoints[(val % 16)];
}

