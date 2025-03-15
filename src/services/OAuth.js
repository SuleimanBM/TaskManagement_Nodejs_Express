import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/authModel.js';


export default passport.use(new GoogleStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const user = await User.findOne({email: profile.email});
            if (user) {
                return done(null, user);
            }
            const createUser = await User.create({
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
            });
            console.log("createdUser", createUser);
            return done(null, createUser);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));