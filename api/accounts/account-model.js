const db = require('../../data/dbConfig');
module.exports = {
  getAll() {
    // SELECT * FROM accounts;
    return db('accounts');
  },
  getById(id) {
    // SELECT * FROM accounts WHERE id is specified;
    // return db('accounts').where({ id })
    return db('accounts').where('id', id).first();
  },
  create(account) {
    return db('accounts')
      .insert(account)
      .then(([id]) => {
        return db('accounts').where('id', id).first();
      });
  },
  update(id, account) {
    return db('accounts').where('id', id).update(account);
  },
  delete(id) {
    return db('accounts').where('id', id).del();
  },
};
