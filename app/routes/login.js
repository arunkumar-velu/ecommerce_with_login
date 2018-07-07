const uuidv1 = require('uuid/v1');
module.exports = function(app, db) {
  app.get('/api/login', (req, res) => {
    var body = req.query;
    console.log(body);
    db.hgetall('RID_'+body.email+'_'+body.pass, function (error, result) {
      if (error) {
        console.log(error);
        res.send('error')
        throw error;
      }
      res.cookie('rid_token', result.token)
      res.redirect('/');
    });
  }); 
  app.post('/api/signup', (req, res) => {
    console.log(req.body);
    var token = uuidv1();
    var body = req.body;
    var signup = {
      email : body.email,
      password : body.pass,
      token: token
    }
    db.hmset('RID_'+body.email+'_'+body.pass, signup);
    db.hmset('RID_'+token, signup);
    res.redirect('/');
  }); 
  app.get('/api/logout', (req, res) => {
    res.cookie('rid_token', null);
    res.send({success: true});
  });
  app.get('/api/user', (req, res) => {
    var body = req.cookies;
    console.log(body);
    db.hgetall('RID_'+body.rid_token, function (error, result) {
      if (error) {
        console.log(error);
        res.send('error')
        throw error;
      }
      console.log(result);

      if(result){
        res.send(result);
      }
      res.send();
    });
  }); 
};