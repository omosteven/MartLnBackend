const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const nodemailer = require('nodemailer');

const {resolve} = require('path');

const {rejects} = require('assert');

const axios = require('axios');

class Util { /**
   * @description
   *
   * @param {Object}
   *
   * @return {String} Returned messsage
   */

    static validateInput(check, data) {
        var count = 0;

        for (const key in data) {
            if (check.includes(key)) {
                count += 1;
            }
        }
        if ((count === Object.keys(check).length) & (count !== 0)) {
            return true;
        } else {
            return false;
        }
    }

    static verifyToken(tokens) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFTUFJTCI6Im9tb3N0ZXZlIiwiaWF0IjoxNjA2MTI3NzQ2LCJleHAiOjE2MDYxMzEzNDZ9.3ONUtIW7tFbRA9s15oIfdnEy6rLWGXs_rPrBCHEQqHM';

        try {
            payload = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFTUFJTCI6Im9tb3N0ZXZlIiwiaWF0IjoxNjA2MTI3NzQ2LCJleHAiOjE2MDYxMzEzNDZ9.3ONUtIW7tFbRA9s15oIfdnEy6rLWGXs_rPrBCHEQqHM', 'my_secret_key');

            return payload.EMAIL;
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return 'Expired!';
            } else {
                return 'Error';
            }
        }
    }

    static generateToken(EMAIL) {
        const jwtKey = 'my_secret_key';

        const jwtExpirySeconds = 3600;

        const token = jwt.sign({
            EMAIL
        }, jwtKey, {
            algorithm: 'HS256',

            expiresIn: jwtExpirySeconds
        });

        return token;
    }

    static sendMail(mailOptions) {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'omosteven123@gmail.com',
                    pass: 'adebomii'
                }
            });

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    static generateRandomStr(size) { // return randomBytes(5).toString("hex");
        return crypto.randomBytes(256).toString('hex').slice(0, size);
    }


}

module.exports = Util;
