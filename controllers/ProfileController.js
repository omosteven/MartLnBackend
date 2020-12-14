const ProfileModel = require("../models/ProfileSchema");

const AuthModel = require("../models/UserSchema");

const VerifyToken = require("../util/VerifyToken");

const FetchUserProfile = (type, request, response) => {
  // assign the justed signed in token
  const authToken = request.TOKEN;

  const isEmail = VerifyToken.VerifyToken(authToken);

  if (isEmail !== "Expired!") {
    ProfileModel.findOne(
      {
        EMAIL: isEmail
      },
      (err, res) => {
        if (err) {
          response.status(401).send({
            type: type,

            route: "/profile/fetch/",

            request: request,

            message: "An Error Occurred",

            data: {
              database: "mongoDB",

              architecture: "mongoose"
            }
          });
        } else {
          //Look up for the personal info data from the auth schema

          AuthModel.findOne(
            {
              EMAIL: isEmail
            },
            (userErr, userData) => {
              if (userErr) {
                response.status(401).send({
                  type: type,

                  route: "/profile/fetch/",

                  request: request,

                  message: "An Error Occurred",

                  data: {
                    database: "mongoDB",

                    architecture: "mongoose"
                  }
                });
              } else {
                if (res === null) {
                  const res = {
                    EMAIL: isEmail,

                    FIRSTNAME: userData.FIRSTNAME,

                    LASTNAME: userData.LASTNAME,

                    ACCOUNTSTATUS: "Not Chosen Yet!",

                    NOOFBUSINESS: 0,

                    DOCUMENTID: null,

                    DOCUMENTTYPE: "None",

                    DOCUMENTREPORT: "Not Uploaded Yet!",

                    TWITTERID: "Not Yet Integrated!",

                    INSTAGRAMID: "Not Yet Integrated!"
                    
                  };

                  response.status(200).send({
                    type: type,

                    route: "/profile/fetch/",

                    request: request,

                    message: "Voila!",

                    data: {
                      database: "mongoDB",

                      architecture: "mongoose",

                      profile: res
                    }
                  });
                } else {
                  response.status(200).send({
                    type: type,

                    route: "/profile/fetch/",

                    request: request,

                    message: "Voila!",

                    data: {
                      database: "mongoDB",

                      architecture: "mongoose",

                      profile: res
                    }
                  });
                }
              }
            }
          );
        }
      }
    );
  } else {
    response.status(401).send({
      type: type,

      route: "/profile/fetch/",

      request: request,

      message: "Sorry, You're not authorized for this!",

      data: {
        database: "mongoDB",

        architecture: "mongoose",

        email: isEmail
      }
    });
  }
};

const UpdateUserProfile = (type, request, response) => {
  // assign the justed signed in token
  const authToken = request.TOKEN;

  const updateTitle = request.TITLE;

  const updateData = request.DATA;

  const isEmail = VerifyToken.VerifyToken(authToken);

  if (isEmail !== "Expired!") {
    ProfileModel.findOne(
      {
        EMAIL: isEmail
      },
      (err, res) => {
        if (err) {
          response.status(401).send({
            type: type,

            route: "/profile/update/",

            request: request,

            message: "An Error Occurred",

            data: {
              database: "mongoDB",

              architecture: "mongoose"
            }
          });
        } else {
          // add Email to the data to update
          updateData.EMAIL = isEmail;

          // check if the user already owns an existing profile

          if (res === null) {
            // insert new profile if not existed yet

            let insertNewProfile = new ProfileModel(updateData);

            insertNewProfile
              .save()

              .then(() => {
                response.status(200).send({
                  type: type,

                  route: "/profile/update/",

                  request: request,

                  message: "Voila! Successfully Updated",

                  data: {
                    database: "mongoDB",

                    architecture: "mongoose"
                  }
                });
              })

              .catch(error => {
                response.status(400).send({
                  type: type,

                  route: "/profile/update/",

                  request: request,

                  message: "We're sorry, we could not update that profile!",

                  data: {
                    database: "mongoDB",

                    architecture: "mongoose"
                  }
                });
              });
          } else {
            // update the profile if already existed

            ProfileModel.updateOne(
              {
                EMAIL: isEmail
              },
              updateData,
              (err, res) => {
                if (err) {
                  response.status(400).send({
                    type: type,

                    route: "/profile/update/",

                    request: request,

                    message: "We're sorry, we could not update that profile!",

                    data: {
                      database: "mongoDB",

                      architecture: "mongoose"
                    }
                  });
                } else {
                  response.status(200).send({
                    type: type,

                    route: "/profile/update/",

                    request: request,

                    message: "Voila! Successfully Updated",

                    data: {
                      database: "mongoDB",

                      architecture: "mongoose"
                    }
                  });
                }
              }
            );
          }
        }
      }
    );
  } else {
    response.status(401).send({
      type: type,

      route: "/profile/update/",

      request: request,

      message: "Sorry, You're not authorized for this!",

      data: {
        database: "mongoDB",

        architecture: "mongoose",

        email: isEmail
      }
    });
  }
};

module.exports.UpdateUserProfile = UpdateUserProfile;

module.exports.FetchUserProfile = FetchUserProfile;
