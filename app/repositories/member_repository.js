'use strict';

let Member = require('../domains/member');

let MemberRepository = function(db){
  this.db = db;
};

MemberRepository.prototype = {
  save: function(m, cb, errCb){
    let db = this.db;
    let data = {email: m.email, password: m.password, full_name: m.fullName};
    let query = 'INSERT INTO member SET ?';
    db.query(query, data, (err, result) => {
      if(err){
        errCb(err);
      }
      cb(result);
    });
  },

  findByEmail: function(email, cb, errCb){
    let db = this.db;
    let query = 'SELECT * FROM member WHERE email = ?';
    db.query(query, [email], (err, results, fields) => {
      if(err){
        errCb(err);
      }
      if(!results){
        cb(`data dengan email '${email}', tidak di temukan`);
      }else{
        let m = results[0];
        let member = new Member(m.id, m.email, m.password, m.full_name);
        cb(member);
      }
    });
  }
};

module.exports = MemberRepository;
