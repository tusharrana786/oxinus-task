const { account } = require('../models')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const CustomError = require('../lib/error');
const { sendMail } = require('../utils/mailer');


exports.create = async({data})=> {
    const {email, password, first_name} = data;
    if(!(email && password && first_name)) throw new CustomError("User credentials not found", 422);
    if(password.length> 50) throw new CustomError("Password must be less than 50 characters", 400);
    const accountDetails = await account.findOne({where: {email}});
    if(accountDetails) throw new CustomError("email already exists", 409);
    const hash = await bcrypt.hash(password, saltRounds);
    if(!hash) throw new CustomError("hash not created", 500);
    const response = await account.create({ email, password : hash, first_name});
    if(!response) throw new CustomError("internal server error", 500);
    sendMail(email);
    return response;
}

exports.login = async function({data}) {
    const {email, password} = data;
    if(!(email && password)) throw new CustomError("User credentials not found", 422);
    const accountData = await account.findOne({where :{email}});
    if(!accountData) throw new CustomError("Account doesn't exist", 404);
    if(!( await bcrypt.compare(password, accountData.password))) throw new CustomError("Account password is wrong", 401)
    const token = jwt.sign({id : accountData.uuid}, 'task', {
        expiresIn: '24h'
    })
    if(!token) throw new CustomError("Token not generating", 500);
    return token;
}