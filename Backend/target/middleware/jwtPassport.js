import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { publicKeyString } from '../config/loadKeyPair.js';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKeyString,
    jsonWebTokenOptions: {
        algorithms: ["ES384"],
        ignoreExpiration: false,
    }
};
opts['secretOrKey'] = 'secret';
passport.use(new JwtStrategy(opts, async (request, jwt_payload) => {
}));
