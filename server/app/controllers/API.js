const router = express.Router();

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/petrol/', function (req, res, next) {
  res.send({test: 'success'});
});





