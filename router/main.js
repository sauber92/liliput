var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var request = require('request');
var query = encodeURI('https://developers.naver.com/docs/utils/shortenurl');
var pwconfig = require('../config/password');

module.exports = function(app, fs) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  app.get('/', function(req, res) {
    res.render('index', {
      title: 'liliput'    
    }); 
  });

  app.get('/url', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/util/shorturl';
    var request = require('request');
    var options = {
      url: api_url,
      form: {'url':query},
      headers: {'X-Naver-Client-Id': pwconfig.client_id, 'X-Naver-Client-Secret': pwconfig.client_secret}
    };
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });
}
