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
  db.createTable('charity-user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true }, 
    charity_id:
    {
      type: 'int',
      foreignKey: {
        name: 'id',
        table: 'charity',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  }, callback);
};

exports.down = function(db) {
  db.dropTable('charity-user')
};

exports._meta = {
  "version": 1
};
