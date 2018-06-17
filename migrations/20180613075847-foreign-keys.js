'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.addForeignKey('donation', 'user', 'donation_user_id_fk',
    {
      'user_id': 'id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, db.addForeignKey('donation', 'charity', 'charity_id_fk',
      {
        'charity_id': 'id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, db.addForeignKey('role', 'user', 'role_id_fk',
        {
          'user_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }, db.addForeignKey('address', 'user', 'address_user_fk',
          {
            'user_id': 'id'
          }, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          }, db.addForeignKey('payment', 'user', 'payment_user_fk',
            {
              'user_id': 'id'
            }, {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
            }, db.addForeignKey('payment', 'address', 'address_payment_fk',
              {
                'address_id': 'id'
              }, {
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT'
              }, db.addForeignKey('project', 'charity', 'project_charity_fk',
                {
                  'charity_id': 'id'
                }, db.addForeignKey('post', 'project', 'post_project_fk',
                {
                  'project_id': 'id'
                }, {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
                }, callback
              ))))))));

};

exports.down = function (db, callback) {
  db.removeForeignKey('donation', 'donation_user_id_fk',
    db.removeForeignKey('donation', 'charity_id_fk',
      db.removeForeignKey('role', 'role_id_fk',
        db.removeForeignKey('payment', 'payment_user_fk',
          db.removeForeignKey('payment', 'address_payment_fk',
            db.removeForeignKey('project', 'project_charity_fk',
              db.removeForeignKey('post', 'post_project_fk', callback)))))));

};

exports._meta = {
  "version": 1
};



