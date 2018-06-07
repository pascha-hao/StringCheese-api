'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true }, 
    //full_name: { type: 'string', length: 40 }, 
    firstname: { type: 'string'},
    lastname: { type: 'string'},
    email: { type: 'string', length: 50 },
    password: { type: 'string', length: 50 } 
  }, callback);
};

exports.down = function (db) {
  db.dropTable('user')
};

exports._meta = {
  "version": 1
};
