'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  // db.addColumn('user1', 'firstname1', { type: 'string'}, callback);
  // db.addColumn('user1', 'lastname1', { type: 'string'}, callback);
  // db.removeColumn('user1', 'full_name', callback);
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};