'use strict';

let MemberRepository = require('../repositories/member_repository');
let db = require('../config/mysql_config');

let index = (req, res, next) => {
  res.render('index', {'title': 'Please Login'});
};

let login = (req, res, next) => {
  res.render('login', {'title': 'Login', 'message': req.flash('message')[0]});
};

let myProfile = (req, res, next) => {
  let profile = req.user;
  res.render('profile', {'title': 'My Profile', 'profile': profile});
};

let logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};

module.exports = {
  index: index,
  login: login,
  myProfile: myProfile,
  logout: logout
};
