'use strict';

let Member = function(id, email, password, fullName){
  this.id = id;
  this.email = email;
  this.password = password;
  this.fullName = fullName;
};

Member.prototype.isValidPassword = function(password){
  return this.password === password;
};

module.exports = Member;
