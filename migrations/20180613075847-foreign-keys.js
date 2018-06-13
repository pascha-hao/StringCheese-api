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

exports.up = function (db, callback)
{
  db.addForeignKey('donation', 'user', 'donation_user_id_fk',
  {
    'donation_id': 'id'
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  }, callback);
  db.addForeignKey('donation', 'charity', 'charity_id1',
{
  'charity_id': 'id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('role', 'user', 'role_id_fk',
{
  'role_id': 'id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('address', 'user', 'address_user_fk',
{
  'address_id': 'id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('payment', 'user', 'payment_user_fk',
{
  'payment_id': 'user_id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('payment', 'address', 'address_id_fk',
{
  'payment_id': 'address_id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('project', 'charity', 'project_charity_fk',
{
  'project_id': 'charity_id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('address', 'user', 'role_id_fk',
{
  'address_id': 'id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
 

}

exports.down = function(db) {
  db.removeForeignKey('donation', 'user_id1',
    db.removeForeignKey('donation', 'charity_id1',
      db.removeForeignKey('payment', 'user_id2',
        db.removeForeignKey('payment', 'address_id',
          db.removeForeignKey('post', 'project_id',
            db.removeForeignKey('project', 'charity_id2',
              db.removeForeignKey('address', 'user_id3', callback)))))));

};

exports._meta = {
  "version": 1
};
