const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.get_login = function(req, res, next){
  return res.render('login');
};

exports.post_login = [
  body('username', 'Username must be between 5 and 18 characters!').trim().isLength({min:5, max:18}),
  body('password', 'Password must be between 5 and 18 characters!').trim().isLength({min:5, max:18}),

  (req, res, next) => {
    let errors = validationResult(req);

    let user = new User({
      username: req.body.username,
      password: req.body.password
    });

    if(!errors.isEmpty()){
      return res.render('login', {user: user, errors: errors.array()});
    }

    // save user to database
    user.save(function(err) {
        if (err){ next(err) };
        console.log('user ' + user.name + ' logged in at ' + Date.now);
        return res.redirect('/catalog');
    });
  }
];

exports.get_signup = function(req, res, next){
  return res.render('signup');
};

exports.post_signup = [
  body('username', 'Username must be between 5 and 18 characters!').trim().isLength({min:5, max:18}),
  body('password', 'Password must be between 5 and 18 characters!').trim().isLength({min:5, max:18}),

  (req, res, next) => {
    let errors = validationResult(req);

    let user = new User({
      username: req.body.username,
      password: req.body.password
    });

    if(!errors.isEmpty()){
      return res.render('signup', {user: user, errors: errors.array()});
    }

    // save user to database
    user.save(function(err) {
        if (err){ next(err) };
        console.log('user ' + user.name + ' logged in at ' + Date.now);
        return res.redirect('/catalog');
    });
  }
];
