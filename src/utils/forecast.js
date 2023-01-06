const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=accaddd951faccc7f1b0437107a3f0c5&query=${latitude},${longitude}&unit=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: 'Unable to forecast' }, undefined);
        }
        else if (body.error) {
            callback({ error: 'unable to find location' }, undefined);
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees.It feels like ${body.current.feelslike}`);
        }
    })
}
module.exports = forecast;