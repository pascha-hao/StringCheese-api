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
  db.createTable('post', {
    post_id: {
      type: 'int', 
      primaryKey: true 
    }, 
    projectid: { 
      type: 'int'
    },
    title: {
      type: 'string',
      length: 40
    },
    description: {
      type: 'string',
      length: 40
    },
    postimg: {
      type: 'string',
      length: 2000
    }
  },
    callback);
};

exports.down = function(db) {
  db.dropTable('post')
  
};

exports._meta = {
  "version": 1
};
