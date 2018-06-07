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
  db.createTable('address', {
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
        mapping: 'user_id'
      }
    },
    street_address: { type: 'string'}, 
    city: { type: 'string'},
    state: { type: 'string'},
    zip_code: { type: 'string'}
  }, callback);
};

exports.down = function(db) {
  db.dropTable('address')
};


exports._meta = {
  "version": 1
};
