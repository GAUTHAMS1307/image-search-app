const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ oauthId: profile.id, provider: 'google' });
    
    if (!user) {
      user = await User.create({
        oauthId: profile.id,
        provider: 'google',
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0]?.value
      });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name', 'photos']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ oauthId: profile.id, provider: 'facebook' });
    
    if (!user) {
      user = await User.create({
        oauthId: profile.id,
        provider: 'facebook',
        email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        avatar: profile.photos?.[0]?.value
      });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ oauthId: profile.id, provider: 'github' });
    
    if (!user) {
      user = await User.create({
        oauthId: profile.id,
        provider: 'github',
        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
        name: profile.displayName || profile.username,
        avatar: profile.photos?.[0]?.value
      });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
