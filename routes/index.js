var express = require('express');
var router = express.Router();
var superagent = require('superagent')
var querystring = require('querystring')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',null);
 });

router.get('/tickets/:respondent_first_name/:respondent_last_name', function(req, res, next){
  var format = req.query.format
  var query_params = {
    respondent_first_name: req.params.respondent_first_name,
    respondent_last_name: req.params.respondent_last_name
  }

  console.log(query_params)

  targetUrl = "https://nycopendata.socrata.com/resource/y6h5-jvss.json"

  superagent
  .get(targetUrl)
  .query(query_params)
  .set('Accept', 'application/JSON')
  .end(function(err, response){
    if(err){
      console.log(err)
      render('error')
      return
    }
    if(format=='json'){    
      res.json({
        tickets: response.body
      })
      return
    }
    res.render('tickets', {tickets: response.body})
  })
})


router.post('/', function(req, res, next){
  console.log(querystring.stringify(req.body))
  var redirectUrl = "/tickets/" + req.body.respondent_first_name + '/' + req.body.respondent_last_name
  console.log(redirectUrl)
  res.redirect(redirectUrl)
})

module.exports = router;
