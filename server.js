const express        = require('express');
const bodyParser     = require('body-parser');
const redis          = require('redis');
const app            = express();
const port           = 7001;
const path           = require('path');
var client           = redis.createClient();
var cookieParser     = require('cookie-parser');
app.set('port', (process.env.PORT || port));
app.use('/assets', express.static(path.join(__dirname, '/app/assets')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({
  inflate: true,
  limit: '100kb',
  type: 'application/*'
}));
app.use(cookieParser());

client.on('connect', function() {
    require('./app/routes')(app, client);
    app.get('/login', function(req, res) {
      res.sendFile(path.join(__dirname + '/app/template/login/index.html'));
    });
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/app/template/account/index.html'));
    });
    app.listen(app.get('port'), () => {
      console.log('We are live on ' + app.get('port'));
    });
});
client.on('error', function (err) {
    console.log('In Redis Something went wrong ' + err);
});

