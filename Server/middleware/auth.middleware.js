import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';

const jwtSecret = toString(process.env.TOKEN_SECRET);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('access-token'),
  secretOrKey: jwtSecret,
};

const loggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    const user = await User.findById(payload.id);
    const userChecked = user.id ? { id: user.id } : null;

    if (userChecked) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

export {loggedIn};