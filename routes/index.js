var express = require('express');
var router = express.Router();
var usermanager = require('./users.js');

router.get('/ind', function(req, res) {
  res.render('index', { title: 'Express' });
});

/**
 * Login POST api.
 * Sets a cookie with the username upon success.
 * On login failure, the server will reply with a 401 error.
 *
 * @api public
 * @param {String} username
 * @param {String} password
 */

router.post('/login', function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  if(!username || !password) {
    return res.status(400).send();
  }
  usermanager.login(username, password, (err, result, docs) => {
    if(result) {
      console.log(err, result, docs, req.session);
      req.session.user = docs.user;
      res.send(result);
    }
    else {
      res.status(401).send();
    }
  });
});


router.post('/newuser', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if(!username || !password) {
    return res.status(400).send();
  }
  usermanager.register(username, password, (err, result) => {
    console.log(err, result);
    res.send(result);
  });
});

module.exports = router;
