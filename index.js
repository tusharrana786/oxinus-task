const express = require('express');
const cors = require('cors');
require("dotenv").config();
var http = require('http');
const { sequelize } = require('./models');
const session = require('express-session');
const {passport} = require('./config/passportconfig');

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));

app.listen(process.env.PORT, async function () {
    await sequelize.sync();
    console.log(`server running at ${process.env.PORT}`);
})