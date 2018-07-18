const express = require('express');
const router = express.Router();
const axios = require('axios');

const Prices = require('../models/price');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/petrol/', function (req, res, next) {
  Prices.find({}, function(err, docs) {
    if (!err) {
      res.send(docs);
    }else {
      res.send({error: 'Data not available'});
    }
  });


  axios.get('https://projectzerothree.info/api.php?format=json')
    .then(function(response) {
     res.send(response.data);
  }).catch(function (err)  {
    res.send({error: 'Data not available'});
  });
});





