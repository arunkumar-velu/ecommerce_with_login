module.exports = function(app, db) {
  app.post('/api/restore_id', (req, res) => {
    var body = req.body;
    var cookies = req.cookies;
    console.log(body, cookies);
    db.hmset('RID_'+cookies.rid_token, body);
    res.send({success: true});
  });
  app.get('/restore_id', (req, res) => {
    console.log(req.query);
    var body = req.query;
    db.get('RID_'+body.application_token+'_'+body.email, function (error, result) {
      if (error) {
        console.log(error);
        res.send('error')
        throw error;
      }
      res.send({"restoreId": result})
    });
  });
};