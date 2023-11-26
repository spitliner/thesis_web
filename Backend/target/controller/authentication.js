import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import * as jose from 'jose';
import crypto from 'node:crypto';
import * as genkey from "../config/loadKeyPair.js";
class Authentication {
    static async hashPassword(password) {
        return argon2.hash(password, {
            type: argon2.argon2id,
            hashLength: 100,
            timeCost: 4,
        });
    }
    static async verifyPassword(password, hash) {
        return argon2.verify(hash, password);
    }
    static async createTokenJose(payload) {
        payload["padding"] = crypto.randomBytes(48).toString('base64');
        return new jose.SignJWT(payload)
            .setProtectedHeader({ alg: "EdDSA" }) //Ed25519
            .setExpirationTime('12h')
            .setNotBefore('0.01s')
            .sign(genkey.privateKeyObject);
    }
    static async createTokenJWT(payload) {
        payload["padding"] = crypto.randomBytes(48).toString('base64');
        return jwt.sign(payload, {
            passphrase: String(process.env.KEY_PASS),
            key: genkey.privateKeyString
        });
    }
    static async verifyTokenJose(token) {
        try {
            const { payload, protectedHeader } = await jose.jwtVerify(token, genkey.publicKeyObject, {
                algorithms: ["EdDSA"]
            });
            return {
                "payload": payload,
                "header": protectedHeader
            };
        }
        catch (error) {
            console.log(error);
            return { "error": "invalid token" };
        }
    }
    static async checkJWTpayload(payload, userID) {
        return payload["id"] === userID;
    }
    static async checkData(tokenType, token, userID) {
        switch (tokenType) {
            case "jwt": {
                const payload = await this.verifyTokenJose(token);
                if (undefined === payload["error"]) {
                    return this.checkJWTpayload(payload, userID);
                }
                return false;
            }
            case "oauth":
                return false;
            case "oauth2":
                return false;
            default:
                return false;
        }
    }
}
/*
Authentication.createTokenJose({a: "b"}).then(async (result) => {
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    console.log(result);
await sleep(1000);
    Authentication.verifyTokenJose(result).then((token) => {
        if (undefined !== token.payload) {
            console.log(token.payload.a);
        }
        
    })
});
*/
export default Authentication;
