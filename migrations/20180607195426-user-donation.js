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
  db.createTable('user-donation', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
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
        mapping: 'charity_id'
      }
    },
    amount: { type: 'int'}, 
    user_total_to_charity: { type: 'int'},
    user_total: { type: 'int'},
  }, callback);
};

exports.down = function(db) {
  db.dropTable('user-donation')
};

exports._meta = {
  "version": 1
};
