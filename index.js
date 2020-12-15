const express = require("express"); // import the express js

const bodyParser = require("body-parser") // import bodyParser

const formidable = require("formidable");

const multer = require("multer");

const cors = require("cors");

const app = express(); // initiate the express js


const DB = require("./util/Database");

const AuthRoutes = require("./routes/AuthRoutes");

const ProfileRoutes = require("./routes/ProfileRoutes");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())

// app.use(formData.array());

app.use(express.static("public"));

app.use(cors());

// Handle Cors Policy here -- Start

app.use(function (req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");

    res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");

    if (req.method === "OPTIONS") {

        return res.status(200).end();

    }

    next();

})

// Handle Cors Policy here -- End

app.use("/auth/", AuthRoutes);

app.use("/profile/", ProfileRoutes);

app.use("*", (req, res) => {

    res.status(404).send({

        type: "default",

        route: "/",

        message: "Hi there! Welcome to MartLn API.",

        data: {

            database: "mongoDB",

            architecture: "mongoose"

        }

    })

});


const server = app.listen(process.env.port, () => {

    host = server.address().address;

    port = server.address.port;

    console.log('Server running at ' + "5000" + host);

})
