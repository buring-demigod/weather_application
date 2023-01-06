const request = require('postman-request')
const geocode = (address, callback) => {
    const url = `https://us1.locationiq.com/v1/search?key=pk.73ad663babc5409458b3c64a0cff38fd&q=${encodeURIComponent(address)}&format=json&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback({ error: 'Unable to connect to location services!' }, undefined);
        }
        else if (body.error) {
            callback(body, undefined);
        }
        else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name,
            })
        }
    });
}

module.exports = geocode;