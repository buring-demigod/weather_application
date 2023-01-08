const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//Creating express App.
const app = express();
const port = process.env.PORT || 3000;

//Define Path for Express.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'faiz'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'faiz',
        images: '../../public/images/1.jpg'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'faiz',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'No address provided' });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error);
        }
        forecast(latitude, longitude, (error, result) => {
            if (error) {
                return res.send(error);
            }
            res.send({
                forecast: result,
                location,
                address: req.query.address,
            });
        });
    });
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "you must provide a search term",
//         });
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'help not found',
        name: 'faiz',
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        error: 'page not found',
        name: 'faiz',
    })
});

app.listen(port, () => {
    console.log('server is up on port' + port);
});