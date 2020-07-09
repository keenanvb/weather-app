const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors')

//load env variables
if (process.env.NODE_ENV == 'development') {
    dotenv.config({ path: './config/config-dev.env' });
}

//Enable CORS
app.use(cors());

//Routes
const weather = require('./routes/api/weather');

//use Routes
app.use('/api/weather', weather);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});