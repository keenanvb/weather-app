const express = require('express');
const router = express.Router();
const axios = require('axios')

//@route    GET api/weather/
//@desc     Get current & forcast weather
//@access   public
router.get('/', async (req, res) => {
    try {
        const current = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=cape town&appid=${process.env.OPEN_WEATHER_API}&units=metric`);
        const forcast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=cape town&appid=${process.env.OPEN_WEATHER_API}&units=metric`);

        res.json({ current: current.data, forcast: forcast.data })
    } catch (error) {
        res.status(500).send('Server Error')
    }
});


module.exports = router;

