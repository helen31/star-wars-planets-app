const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

router.route('/api/planets/:page').get((req, res) => {
    const page = req.params['page'];

    request({
        url: `https://swapi.co/api/planets/?page=${page}`,
        json: true
    }, (err, response, body) => {
        if (err) {
            console.log('Unable to connect to Swapi servers.');
        } else {
            res.status(200).send(body);
        }
    })
});

router.route('/api/residents/:number').get((req, res) => {
    const num = req.params['number'];

    request({
        url: `https://swapi.co/api/people/${num}`,
        json: true
    }, (err, response, body) => {
        if (err) {
            console.log('Unable to connect to Swapi servers.');
        } else {
            res.status(200).send(body);
        }
    })

});

router.route('/api/films/:number').get((req, res) => {
    const num = req.params['number'];

    request({
        url: `https://swapi.co/api/films/${num}`,
        json: true
    }, (err, response, body) => {
        if (err) {
            console.log('Unable to connect to Swapi servers.');
        } else {
            res.status(200).send(body);
        }
    })

});

app.use('/', router);

app.listen(4000, () => {
    console.log('Express server running on port 4000');
});