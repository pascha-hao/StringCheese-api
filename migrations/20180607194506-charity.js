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

exports.up = function (db, callback) {
  db.createTable('charity', {
    id: { type: 'int', primaryKey: true, autoIncrement: true }, 
    name: { type: 'string'},
    slogan: { type: 'string'},
    description: { type: 'string'}
  }, callback);
};

exports.down = function(db) {
  db.dropTable('charity')
};

exports._meta = {
  "version": 1
};
