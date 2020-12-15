const UserModel = require("../models/UserSchema");

const BusinessModel = require("../models/BusinessSchema");

const verifyToken = require("../util/VerifyToken");
const Util = require("../util/Util");

class Profile {

    static fetch(req, res, next) {
        const {TOKEN} = req.body;

        if (TOKEN !== undefined && TOKEN !== null) {
            const isTokenValidThenEmail = verifyToken(TOKEN);

            if (isTokenValidThenEmail === 'Expired!') {
                res.status(401).send({
                    type: "Profile",

                    route: "/profile/fetch/",

                    request: {
                        TOKEN: TOKEN
                    },

                    payloads: {
                        TOKEN: "String"
                    },

                    message: "Your session has expired!",

                    devMessage: "Token has expired",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            } else if (isTokenValidThenEmail === 'Error') {
                res.status(404).send({
                    type: "Profile",

                    route: "/profile/fetch/",

                    request: {
                        TOKEN: TOKEN
                    },

                    payloads: {
                        TOKEN: "String"
                    },

                    message: "Unable to fetch profile",

                    devMessage: "Token could not be verified",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            } else {
                UserModel.findOne({
                    EMAIL: isTokenValidThenEmail
                }, (errFetch, respFetch) => {
                    if (errFetch) {
                        res.status(404).send({
                            type: "Profile",

                            route: "/profile/fetch/",

                            request: {
                                EMAIL: isTokenValidThenEmail
                            },

                            payloads: {
                                TOKEN: "String"
                            },

                            message: "Unable to fetch profile. Kindly refresh your browser.",

                            devMessage: "Error occurred while making the request.",

                            expectedResult: {
                                PROFILEPICLINK: "Profile Pic URL",
                                ACCOUNTSTATUS: "The account status? Own or promote a business.",
                                NOOFBUSINESS: "No of businesses",
                                DOCUMENTID: "Url to the document",
                                DOCUMENTTYPE: "Type of document.",
                                DOCUMENTREPORT: "Status of the document? Verified or not.",
                                TWITTERID: "Twitter url of the user.",
                                INSTAGRAMID: "Instagram url of the user."
                            },

                            server: {
                                database: "mongoDB",

                                architecture: "mongoose"
                            }
                        });
                    } else {
                        if (respFetch === null) {
                            res.status(404).send({
                                type: "Profile",

                                route: "/profile/fetch/",

                                request: {
                                    EMAIL: isTokenValidThenEmail
                                },

                                payloads: {
                                    TOKEN: "String"
                                },

                                message: "Unable to fetch profile",

                                devMessage: "Profile not found.",

                                expectedResult: {
                                    PROFILEPICLINK: "Profile Pic URL",
                                    ACCOUNTSTATUS: "The account status? Own or promote a business.",
                                    NOOFBUSINESS: "No of businesses",
                                    DOCUMENTID: "Url to the document",
                                    DOCUMENTTYPE: "Type of document.",
                                    DOCUMENTREPORT: "Status of the document? Verified or not.",
                                    TWITTERID: "Twitter url of the user.",
                                    INSTAGRAMID: "Instagram url of the user."
                                },

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        } else { // Hide the password
                            respFetch.PASSWORD = "Unauthorized!";

                            res.status(200).send({
                                type: "Profile",

                                route: "/profile/fetch/",

                                request: {
                                    EMAIL: isTokenValidThenEmail
                                },

                                payloads: {
                                    TOKEN: "String"
                                },

                                message: "Profile fetched successfully.",

                                devMessage: "Success.",

                                data: respFetch,

                                expectedResult: {
                                    PROFILEPICLINK: "Profile Pic URL",
                                    ACCOUNTSTATUS: "The account status? Own or promote a business.",
                                    NOOFBUSINESS: "No of businesses",
                                    DOCUMENTID: "Url to the document",
                                    DOCUMENTTYPE: "Type of document.",
                                    DOCUMENTREPORT: "Status of the document? Verified or not.",
                                    TWITTERID: "Twitter url of the user.",
                                    INSTAGRAMID: "Instagram url of the user."
                                },

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        }
                    }
                })

            }
        } else {
            res.status(400).send({
                type: "Profile",

                route: "/profile/fetch/",

                request: {
                    TOKEN: TOKEN
                },

                payloads: {
                    TOKEN: "String"
                },

                message: "Unable to fetch data",

                devMessage: "No token found",

                expectedResult: {
                    PROFILEPICLINK: "Profile Pic URL",
                    ACCOUNTSTATUS: "The account status? Own or promote a business.",
                    NOOFBUSINESS: "No of businesses",
                    DOCUMENTID: "Url to the document",
                    DOCUMENTTYPE: "Type of document.",
                    DOCUMENTREPORT: "Status of the document? Verified or not.",
                    TWITTERID: "Twitter url of the user.",
                    INSTAGRAMID: "Instagram url of the user."
                },

                server: {
                    database: "mongoDB",

                    architecture: "mongoose"
                }
            });
        }
    }

    static update(req, res, next) {
        const {TOKEN, SECTION, DATA} = req.body;

        if (TOKEN !== undefined && TOKEN !== null) {
            const isTokenValidThenEmail = verifyToken(TOKEN);

            if (isTokenValidThenEmail === 'Expired!') {
                res.status(401).send({
                    type: "Profile",

                    route: "/profile/update/",

                    request: req.body,

                    payloads: {
                        TOKEN: "String",
                        ACCOUNT: {
                            ACCOUNTSTATUS: "String"
                        },
                        BUSINESS: {
                            BUSINESSNAME: "String",
                            BUSINESSADDRESS: "String",
                            BUSINESSTYPE: "String",
                            NOOFEMPLOYEES: "Number",
                            BUSINESSWEBSITE: "String",
                            BUSINESSCONTACTINFO: "String",
                            BUSINESSTWITTERURL: "String",
                            BUSINESSINSTAGRAMURL: "String"
                        },
                        DOCUMENT: {
                            DOCUMENTTYPE: "String",
                            DOCUMENTREPORT: "String"
                        },
                        SOCIALMEDIA: {
                            TWITTERID: "String",
                            INSTAGRAMID: "String"
                        }
                    },

                    message: "Your session has expired!",

                    devMessage: "Token has expired",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            } else if (isTokenValidThenEmail === 'Error') {
                res.status(404).send({
                    type: "Profile",

                    route: "/profile/update/",

                    request: req.body,

                    payloads: {
                        TOKEN: "String"
                    },

                    message: "Unable to update profile.",

                    devMessage: "Token could not be verified",

                    server: {
                        database: "mongoDB",

                        architecture: "mongoose"
                    }
                });
            } else { // UserModel.findOne

                let updateData = {};

                switch (SECTION) {
                    case "BUSINESS": updateData = DATA;
                        break
                    case "ACCOUNT": updateData = DATA;
                        break
                    case "DOCUMENT": updateData = DATA;
                        break;
                    case "SOCIALMEDIA": updateData = DATA;
                        brea;
                    default: updateData = {};
                        break
                };

                if (Object.values(updateData).length === 0) {
                    res.status(401).send({
                        type: "Profile",

                        route: "/profile/update/",

                        request: req.body,

                        payloads: {
                            TOKEN: "String",
                            ACCOUNT: {
                                ACCOUNTSTATUS: "String"
                            },
                            BUSINESS: {
                                BUSINESSNAME: "String",
                                BUSINESSADDRESS: "String",
                                BUSINESSTYPE: "String",
                                NOOFEMPLOYEES: "Number",
                                BUSINESSWEBSITE: "String",
                                BUSINESSCONTACTINFO: "String",
                                BUSINESSTWITTERURL: "String",
                                BUSINESSINSTAGRAMURL: "String"
                            },
                            DOCUMENT: {
                                DOCUMENTTYPE: "String",
                                DOCUMENTREPORT: "String"
                            },
                            SOCIALMEDIA: {
                                TWITTERID: "String",
                                INSTAGRAMID: "String"
                            }
                        },

                        message: "Unable to update profile.",

                        devMessage: "Invalid section",

                        server: {
                            database: "mongoDB",

                            architecture: "mongoose"
                        }
                    });
                } else {
                    if (SECTION !== "BUSINESS") {
                        UserModel.findOneAndUpdate({
                            EMAIL: isTokenValidThenEmail
                        }, updateData, (errUpdate, respUpdate) => {

                            if (errUpdate) {
                                res.status(404).send({
                                    type: "Profile",

                                    route: "/profile/update/",

                                    request: req.body,

                                    payloads: {
                                        TOKEN: "String",
                                        ACCOUNT: {
                                            ACCOUNTSTATUS: "String"
                                        },
                                        BUSINESS: {
                                            BUSINESSNAME: "String",
                                            BUSINESSADDRESS: "String",
                                            BUSINESSTYPE: "String",
                                            NOOFEMPLOYEES: "Number",
                                            BUSINESSWEBSITE: "String",
                                            BUSINESSCONTACTINFO: "String",
                                            BUSINESSTWITTERURL: "String",
                                            BUSINESSINSTAGRAMURL: "String"
                                        },
                                        DOCUMENT: {
                                            DOCUMENTTYPE: "String",
                                            DOCUMENTREPORT: "String"
                                        },
                                        SOCIALMEDIA: {
                                            TWITTERID: "String",
                                            INSTAGRAMID: "String"
                                        }
                                    },

                                    message: "Unable to update profile. Kindly try again.",

                                    devMessage: "Error occurred while making the request.",

                                    server: {
                                        database: "mongoDB",

                                        architecture: "mongoose"
                                    }
                                });
                            } else {
                                if (respUpdate === null) {
                                    res.status(404).send({
                                        type: "Profile",

                                        route: "/profile/update/",

                                        request: req.body,

                                        payloads: {
                                            TOKEN: "String",
                                            ACCOUNT: {
                                                ACCOUNTSTATUS: "String"
                                            },
                                            BUSINESS: {
                                                BUSINESSNAME: "String*",
                                                BUSINESSADDRESS: "String*",
                                                BUSINESSTYPE: "String*",
                                                NOOFEMPLOYEES: "Number*",
                                                BUSINESSWEBSITE: "String",
                                                BUSINESSCONTACTINFO: "String*",
                                                BUSINESSTWITTERURL: "String",
                                                BUSINESSINSTAGRAMURL: "String"
                                            },
                                            DOCUMENT: {
                                                DOCUMENTTYPE: "String",
                                                DOCUMENTREPORT: "String"
                                            },
                                            SOCIALMEDIA: {
                                                TWITTERID: "String",
                                                INSTAGRAMID: "String"
                                            }
                                        },

                                        message: "Unable to update profile",

                                        devMessage: "Profile not found.",

                                        server: {
                                            database: "mongoDB",

                                            architecture: "mongoose"
                                        }
                                    });
                                } else {
                                    res.status(200).send({
                                        type: "Profile",

                                        route: "/profile/update/",

                                        request: req.body,

                                        payloads: {
                                            TOKEN: "String",
                                            ACCOUNT: {
                                                ACCOUNTSTATUS: "String"
                                            },
                                            BUSINESS: {
                                                BUSINESSNAME: "String*",
                                                BUSINESSADDRESS: "String*",
                                                BUSINESSTYPE: "String*",
                                                NOOFEMPLOYEES: "Number*",
                                                BUSINESSWEBSITE: "String",
                                                BUSINESSCONTACTINFO: "String*",
                                                BUSINESSTWITTERURL: "String",
                                                BUSINESSINSTAGRAMURL: "String"
                                            },
                                            DOCUMENT: {
                                                DOCUMENTTYPE: "String",
                                                DOCUMENTREPORT: "String"
                                            },
                                            SOCIALMEDIA: {
                                                TWITTERID: "String",
                                                INSTAGRAMID: "String"
                                            }
                                        },

                                        message: "Profile successfully updated.",

                                        devMessage: "Success.",

                                        data: respFetch,

                                        server: {
                                            database: "mongoDB",

                                            architecture: "mongoose"
                                        }
                                    });
                                }
                            }
                        })
                    } else {
                        let BusinessID = Util.generateRandomStr(10);
                        let BUSINESSLOGOLINK = Util.generateRandomStr(5);
                        let BusinessData = {
                            BUSINESSLOGOLINK: BUSINESSLOGOLINK,
                            BUSINESSID: BusinessID,
                            BUSINESSNAME: updateData.BUSINESSNAME,
                            BUSINESSADDRESS: updateData.BUSINESSADDRESS,
                            BUSINESSTYPE: updateData.BUSINESSTYPE,
                            NOOFEMPLOYEES: updateData.NOOFEMPLOYEES,
                            BUSINESSWEBSITE: updateData.BUSINESSWEBSITE,
                            BUSINESSCONTACTINFO: updateData.BUSINESSCONTACTINFO,
                            BUSINESSTWITTERURL: updateData.BUSINESSTWITTERURL,
                            BUSINESSINSTAGRAMURL: updateData.BUSINESSINSTAGRAMURL
                        }
                        let Business = new BusinessModel(BusinessData);

                        Business.save(() => {
                            res.status(200).send({
                                type: "Profile",

                                route: "/profile/update/",

                                request: req.body,

                                payloads: {
                                    TOKEN: "String",
                                    ACCOUNT: {
                                        ACCOUNTSTATUS: "String"
                                    },
                                    BUSINESS: {
                                        BUSINESSNAME: "String*",
                                        BUSINESSADDRESS: "String*",
                                        BUSINESSTYPE: "String*",
                                        NOOFEMPLOYEES: "Number*",
                                        BUSINESSWEBSITE: "String",
                                        BUSINESSCONTACTINFO: "String*",
                                        BUSINESSTWITTERURL: "String",
                                        BUSINESSINSTAGRAMURL: "String"
                                    },
                                    DOCUMENT: {
                                        DOCUMENTTYPE: "String",
                                        DOCUMENTREPORT: "String"
                                    },
                                    SOCIALMEDIA: {
                                        TWITTERID: "String",
                                        INSTAGRAMID: "String"
                                    }
                                },

                                message: "Profile successfully updated.",

                                devMessage: "Success.",

                                data: respFetch,

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });

                        }).then(() => {
                            res.status(400).send({
                                type: "Profile",

                                route: "/profile/update/",

                                request: req.body,

                                payloads: {
                                    TOKEN: "String",
                                    ACCOUNT: {
                                        ACCOUNTSTATUS: "String"
                                    },
                                    BUSINESS: {
                                        BUSINESSNAME: "String*",
                                        BUSINESSADDRESS: "String*",
                                        BUSINESSTYPE: "String*",
                                        NOOFEMPLOYEES: "Number*",
                                        BUSINESSWEBSITE: "String",
                                        BUSINESSCONTACTINFO: "String*",
                                        BUSINESSTWITTERURL: "String",
                                        BUSINESSINSTAGRAMURL: "String"
                                    },
                                    DOCUMENT: {
                                        DOCUMENTTYPE: "String",
                                        DOCUMENTREPORT: "String"
                                    },
                                    SOCIALMEDIA: {
                                        TWITTERID: "String",
                                        INSTAGRAMID: "String"
                                    }
                                },

                                message: "Profile successfully updated. Kindly check the inputs and try again",

                                devMessage: "Error occurred while making the request. Kindly check the inputs and try again",

                                data: respFetch,

                                server: {
                                    database: "mongoDB",

                                    architecture: "mongoose"
                                }
                            });
                        })
                    }
                }
            }
        } else {
            res.status(400).send({
                type: "Profile",

                route: "/profile/update/",

                request: req.body,

                payloads: {
                    TOKEN: "String",
                    ACCOUNT: {
                        ACCOUNTSTATUS: "String"
                    },
                    BUSINESS: {
                        BUSINESSNAME: "String",
                        BUSINESSADDRESS: "String",
                        BUSINESSTYPE: "String",
                        NOOFEMPLOYEES: "Number",
                        BUSINESSWEBSITE: "String",
                        BUSINESSCONTACTINFO: "String",
                        BUSINESSTWITTERURL: "String",
                        BUSINESSINSTAGRAMURL: "String"
                    },
                    DOCUMENT: {
                        DOCUMENTTYPE: "String",
                        DOCUMENTREPORT: "String"
                    },
                    SOCIALMEDIA: {
                        TWITTERID: "String",
                        INSTAGRAMID: "String"
                    }
                },

                message: "Unable to update profile.",

                devMessage: "No token found",

                server: {
                    database: "mongoDB",

                    architecture: "mongoose"
                }
            });
        }
    }
}
module.exports = Profile;
