const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/petrol/', function (req, res, next) {
  axios.get('https://projectzerothree.info/api.php?format=json')
    .then(function(response) {
     res.send(response.data);
  }).catch(function (err)  {
    res.send({error: 'Data not available'});
  });
});





