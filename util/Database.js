let mongoose = require('mongoose');

// const server = 'mongodb://localhost:27017/'; // REPLACE WITH YOUR DB SERVER

const server = "mongodb+srv://dbMartLn:V8fxt50agnT4eJC2@cluster0.19owp.mongodb.net/MARTLN?retryWrites=true&w=majority";

// const database = 'MARTLN'; // REPLACE WITH YOUR DB NAME
const database = "";

class Database {

    constructor() {

        this._connect()

    }

    _connect() {

        mongoose.connect(server + database)

        .then(() => {

            console.log('Database connection successful')

        })

        .catch(err => {

            console.error('Database connection error')

        })

    }

}

module.exports = new Database()