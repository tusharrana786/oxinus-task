const { account } = require('../models')
const passport = require('passport');
const CustomError = require("../lib/error");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
  async (token, tokenSecret, profile, done) => {
    try {
      let email = profile.emails[0].value;
      let accountDetails = await account.findOne({where:{email}});
      if (!accountDetails) {
        accountDetails = await account.create({
            first_name: profile.displayName,
            email: profile.emails[0].value,
        });
        if(!accountDetails) throw new CustomError("Unable to save account details", 500)
      }
      return done(null, accountDetails);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  account.findByPk(id, (err, user) => done(err, user));
});

module.exports.passport = passport;