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
  db.createTable('payment', {
    user_id:
    {
      type: 'int',
      foreignKey: {
        name: 'id',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    ccnum: { type: 'string'}, 
    exp: { type: 'date'},
    cvc: { type: 'string'},
    bank: { type: 'string'}
  }, callback);
};

exports.down = function(db) {
  db.dropTable('payment')
};

exports._meta = {
  "version": 1
};
