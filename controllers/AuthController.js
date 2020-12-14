const validator = require("validator");

const passwordHash = require("bcryptjs");

const jwt = require("jsonwebtoken");

const AuthModel = require("../models/UserSchema");

const Util = require("../util/Util");

class AuthController { /**
   * @description
   *
   * @param {Object}
   *
   * @return {String} Returned messsage
   */
    static signUp(req, res, next) {
        const request = req.body;

        const {EMAIL, PASSWORD, FIRSTNAME, LASTNAME} = request;

        const check = ["EMAIL", "PASSWORD", "FIRSTNAME", "LASTNAME"];

        if (Util.validateInput(check, request)) {
            if (validator.isEmail(EMAIL)) { // validate email

                var hashedPassword = passwordHash.hashSync(PASSWORD, 10);

                request.PASSWORD = hashedPassword;

                if (PASSWORD.length >= 8) {
                    request.CONFIRMCODE = Util.generateRandomStr(10);

                    let SignUp = new AuthModel(request);

                    SignUp.save().then(() => { // const
                        const text = "<h3>Hi " + EMAIL + "</h3>" + "<p>Thanks for creating an account with us. Kindly use the link below to confirm your account</p>" + `<a href='https://mentup.com/auth/confirm/${
                            request.CONFIRMCODE
                        }/'>Confirm</a>`;

                        const mailOptions = {
                            from: "MartLN",
                            to: EMAIL,
                            subject: "Thanks for creating an account.",
                            text: text,
                            html: text
                        };

                        Util.sendMail(mailOptions);

                        res.status(200).send({
                            type: "Auth",

                            route: "/auth/register/",

                            request: {
                                EMAIL: EMAIL
                            },

                            payloads: {
                                EMAIL: "required - String",
                                PASSWORD: "required - String(>=8)"
                            },

                            message: "Account Created",

                            server: {
                                database: "mongoDB",

                                architecture: "mongoose"
                            }
                        });
                    }).catch(err => {
                        if (err.keyPattern.EMAIL === 1) {
                            res.status(403).send({
                                type: "Auth",

                                route: "/auth/register/",

                                request: {
                                    EMAIL: EMAIL,

                                    PASSWORD: ""
                                },

                                payloads: {
                                    EMAIL: "required - String",
                                    PASSWORD: "required - String(>=8)"
                                },

                                message: "This email is associated with an existing account.",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        } else {
                            res.status(404).send({
                                type: "Auth",

                                route: "/auth/register/",

                                request: {
                                    EMAIL: EMAIL
                                },

                                payloads: {
                                    EMAIL: "required - String",
                                    PASSWORD: "required - String(>=8)"
                                },

                                message: "We're sorry, an error occurred. Kindly try again!",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        }
                    });

                } else {
                    res.status(401).send({
                        type: "Auth",

                        route: "/auth/register/",

                        request: request,

                        payloads: {
                            EMAIL: "required - String",
                            PASSWORD: "required - String(>=8)"
                        },

                        message: "The password minimum length required is 8!",

                        server: {
                            database: "mongoDB",

                            architecture: "mongoose"
                        }
                    });
                }
            } else {
                res.status(401).send({
                    type: "Auth",

                    route: "/auth/register/",

                    request: request,

                    payloads: {
                        EMAIL: "required - String",
                        PASSWORD: "required - String(>=8)"
                    },

                    message: "The email entered is not valid!",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            }
        } else {
            res.status(400).send({
                type: "Auth",

                route: "/auth/register/",

                request: request,

                payloads: {
                    EMAIL: "required - String",
                    PASSWORD: "required - String(>=8)"
                },

                message: "Incomplete inputs to process",

                server: {
                    database: "mongoDB",

                    architecture: "mongoose"
                }
            });
        }
    }

    static login(req, res, next) {

        const check = ["EMAIL", "PASSWORD"];

        const request = req.body;

        const {EMAIL, PASSWORD} = request;

        if (Util.validateInput(check, request)) {
            if (validator.isEmail(EMAIL)) { // validate email

                const token = Util.generateToken(EMAIL);

                AuthModel.findOneAndUpdate({
                    EMAIL: EMAIL
                }, {
                    TOKEN: token
                }, (err, result) => {
                    if (err) {
                        res.status(404).send({
                            type: "Auth",

                            route: "/auth/signin/",

                            request: {
                                EMAIL: request.EMAIL
                            },

                            payloads: {
                                EMAIL: "required - String",
                                PASSWORD: "required - String(>=8)"
                            },

                            message: "We're sorry, an error occurred. Kindly try again!",

                            server: {
                                database: "mongoDB",

                                architecture: "mongoose"
                            }
                        });
                    } else {
                        if (result === null) {
                            res.status(401).send({
                                type: "Auth",

                                route: "/auth/signin/",

                                request: {
                                    EMAIL: request.EMAIL
                                },

                                payloads: {
                                    EMAIL: "required - String",
                                    PASSWORD: "required - String(>=8)"
                                },

                                message: "Invalid credentials",

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        } else { //    Perform verification

                            var validPasswordTest = passwordHash.compareSync(request.PASSWORD, result.PASSWORD);

                            result.PASSWORD = "";

                            if (validPasswordTest) {
                                res.status(200).send({
                                    type: "Auth",

                                    route: "/auth/signin/",

                                    request: {
                                        EMAIL: request.EMAIL
                                    },

                                    payloads: {
                                        EMAIL: "required - String",
                                        PASSWORD: "required - String(>=8)"
                                    },

                                    message: "Successfully logged in",

                                    data: result,

                                    server: {
                                        database: "mongoDB",

                                        architecture: "mongoose"
                                    },

                                    token: token
                                });
                                console.log("Token here!", token);
                            } else {
                                res.status(401).send({
                                    type: "Auth",

                                    route: "/auth/signin/",

                                    request: {
                                        EMAIL: request.EMAIL
                                    },

                                    payloads: {
                                        EMAIL: "required - String",
                                        PASSWORD: "required - String(>=8)"
                                    },

                                    message: "Invalid credentials",

                                    server: {
                                        database: "mongoDB",

                                        architecture: "mongoose"
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                res.status(401).send({
                    type: "Auth",

                    route: "/auth/signin/",

                    request: {
                        EMAIL: request.EMAIL
                    },

                    payloads: {
                        EMAIL: "required - String",
                        PASSWORD: "required - String(>=8)"
                    },

                    message: "Invalid credentials",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            }
        } else {
            res.status(400).send({
                type: "Auth",

                route: "/auth/signin/",

                request: {
                    EMAIL: request.EMAIL
                },

                payloads: {
                    EMAIL: "required - String",
                    PASSWORD: "required - String(>=8)"
                },

                message: "Incomplete inputs to process",

                server: {
                    database: "mongoDB",

                    architecture: "mongoose"
                }
            });
        }
    }


}

module.exports = AuthController;
