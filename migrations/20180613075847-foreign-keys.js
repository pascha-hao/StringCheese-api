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
  'user_id1': 'id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
  db.addForeignKey('payment', 'address', 'address_payment_fk',
{
  'address_id1': 'address_id'
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
  db.addForeignKey('post', 'project', 'post_project_fk',
{
  'post_id': 'project_id'
}, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
}, 
  callback);
 

}

exports.down = function(db) {
  db.removeForeignKey('donation', 'donation_user_id_fk',
    db.removeForeignKey('donation', 'charity_id1',
      db.removeForeignKey('role', 'role_id_fk',
        db.removeForeignKey('address', 'address_user_fk',
          db.removeForeignKey('payment', 'payment_user_fk',
            db.removeForeignKey('payment', 'address_payment_fk',
              db.removeForeignKey('post', 'post_project_fk', 
               db.removeForeignKey(callback))))))));

};

exports._meta = {
  "version": 1
};
