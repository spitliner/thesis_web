import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import passport from 'passport';
import { publicKeyString } from '../config/loadKeyPair.js';
import express from 'express';
import UserModel from '../database/model/userModel.js';

const opts : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKeyString,
    jsonWebTokenOptions: {
        algorithms: ["ES384"],
        ignoreExpiration: false,
    }
};
opts['secretOrKey'] = 'secret';

passport.use(new JwtStrategy(opts, async (request: express.Request, jwt_payload: {[key: string]: unknown}) => {
    if (0 === UserModel.checkID())
}))