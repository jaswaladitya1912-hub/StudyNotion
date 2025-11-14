require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");


exports.connect = () => {
    mongoose.connect(process.env.Database_Url)
    .then(() => console.log(chalk.bold.greenBright.italic("DB Connected Successfully")))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};