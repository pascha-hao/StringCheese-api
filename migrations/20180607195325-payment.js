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
  db.createTable('payment', {
    id: {
      type: 'int', 
      primaryKey: true 
    }, 
    user_id: {
      type: 'int'
    },
    address_id: {
      type: 'int'
    },
    card_number: {
      type: 'int'
    },
    expiration_date: {
      type: 'int'
    },
    bank: {
      type: 'string',
      length: 40
    },
    CVV: {
      type: 'int',
    }
  }, callback);
  
};

exports.down = function(db, callback) {
  db.dropTable('payment', callback)
};

exports._meta = {
  "version": 1
};
