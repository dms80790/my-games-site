const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.get_login = function(req, res, next){
  return res.render('login');
};

exports.post_login = [
  body('username', 'Username must be between 4 and 18 characters!').trim().isLength({min:4, max:18}),
  body('password', 'Password must be between 4 and 18 characters!').trim().isLength({min:4, max:18}),

  (req, res, next) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.render('login', {user: user, errors: errors.array()});
    } else{
        User.findOne({'username': req.body.username}, function(err, user){
          if(err){ return next(err); }
          if(user){
            console.log('user found');
            user.comparePassword(req.body.password, function(err, match){
              console.log('comparing passwords...');
              if(err){ return next(err); }
              if(match){
                req.session.user = user;
                console.log('user signed in');
                return res.redirect('/catalog');
              } else{
                  let errors = [new Error("Invalid password")];
                  errors[0].status = 404;
                  res.render('login', {errors: errors})
              }
            });
          } else{
            let errors = [new Error("User doesn't exist")];
            errors[0].status = 404;
            res.render('login', {errors: errors})
          }
        });
      }
  }
];

exports.get_signup = function(req, res, next){
  return res.render('signup');
};

exports.post_signup = [
  body('username', 'Username must be between 4 and 18 characters!').trim().isLength({min:4, max:18}),
  body('password', 'Password must be between 4 and 18 characters!').trim().isLength({min:4, max:18}),

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
        console.log('new user ' + user.name + ' saved at ' + Date.now);
        return res.redirect('/catalog');
    });
  }
];
