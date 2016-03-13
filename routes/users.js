var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var bcrypt = require('bcrypt');

module.exports = new UserManager;

function UserManager() {
  this.BC_LEVEL = 10;
  this.db = null;
  this.users = null;
  this.url = 'mongodb://localhost:27017/gpgchat';
  MongoClient.connect(this.url, (err, database) => {
    if(err != null) {
      console.info('Alert: no db connection :(');
    }
    else {
      this.db = database;
      this.users = this.db.collection('users');
      console.info('Connected correctly to server');
    }
  });
}

UserManager.prototype.login = (username, password, cb) => {
  if(!this.db) {
    console.log(this.BC_LEVEL);
    return cb(new Error('No db connection'));
  }
  async.waterfall([
    function(callback) {
      this.users.findOne({'user': username}, (err, docs) => {
        if(!docs) {
          return callback(new Error('No such user'));
        }
        callback(err, docs);
      });
    },
    function(docs, callback) {
      bcrypt.compare(password, docs.password, callback);
    }
  ], cb);
};

UserManager.prototype.register = (username, password, cb) => {
  if(!this.db) {
    return cb(new Error('No db connection'));
  }
  async.waterfall([
    function(callback) {
      this.users.findOne({'user': username}, (err, docs) => {
        // If search returns results, error.
        if(docs) {
          return callback(new Error('User exists'));
        }
        callback(err);
      });
    },
    function(callback) {
      bcrypt.hash(password, this.BC_LEVEL, (err, hash) => {
        if(err) {
          return callback(err);
        }
        callback(err, hash);
      });
    },
    function(hash, callback) {
      this.users.insertOne({'user': username, 'pass': hash}, callback);
    }
  ], cb);
};

UserManager.prototype.delete = (username, password, cb) => {
  if(!this.db) {
    return cb(new Error('No db connection'));
  }
  async.waterfall([
    function(callback) {
      this.users.findOne({'user': username}, (err, docs) => {
        if(!docs) {
          return callback(new Error('No such user'));
        }
        callback(err, docs);
      });
    },
    function(docs, callback) {
      bcrypt.compare(password, docs.password, callback);
    }
  ], cb);
};

UserManager.prototype.helloworld = function() {
  console.log('hello, world');
};
