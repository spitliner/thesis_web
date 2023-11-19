import dotenv from 'dotenv';
dotenv.config()

import fs from 'fs';
import crypto from 'node:crypto';

const privateKeyString = fs.readFileSync("./privateKey.pem", {encoding: "utf-8"});
const publicKeyString = fs.readFileSync("./publicKey.pem", {encoding: "utf-8"});

const privateKeyObject = crypto.createPrivateKey({key: privateKeyString, passphrase: String(process.env.KEY_PASS)});
const publicKeyObject = crypto.createPublicKey(publicKeyString);

export {privateKeyObject, publicKeyObject, privateKeyString, publicKeyString};