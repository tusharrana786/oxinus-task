const { where } = require('sequelize');
const CustomError = require('../lib/error');
const { account } = require('../models')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sendMail } = require("../utils/mailer")

exports.fetchAll = async ({ query }) => {
    const { page, limit } = query;
    if (!(page && limit)) throw new CustomError("Credentials not found", 400)
    const accounts_count = await account.count();
    if (!accounts_count) throw new CustomError("Server Error", 500);
    if (accounts_count <= (page - 1) * limit) throw new CustomError("Data not found", 404);
    const accounts = await account.findAll({ limit: limit, offset: (page - 1) * limit });
    if (!accounts) throw new CustomError("Server Error", 500)
    return accounts;
}

exports.fetch = async ({ params, userId }) => {
    const { id } = params;
    if (!id) throw new CustomError("User credentials not found", 400);
    if (userId !== id) throw new CustomError("Not authorised", 401)
    const response = await account.findOne({ where: { uuid: id } });
    if (!response) throw new CustomError("User does not exist", 404);
    return response;
}

exports.createAccount = async ({ data }) => {
    const { first_name, last_name, email, phone, password, birthDay } = data;
    if (!(email && password && first_name)) throw new CustomError("Bad Credentials", 400);
    const accountData = await account.findOne({ where: { email } });
    if (accountData) throw new CustomError("email already exists", 409);
    const hash = await bcrypt.hash(password, saltRounds);
    if (!hash) throw new CustomError("hash not created", 500);
    const birthDate = new Date(birthDay);
    const year = birthDate.getFullYear();
    const month = String(birthDate.getMonth() + 1).padStart(2, '0');
    const day = String(birthDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    if (birthDate.getTime > new Date().getTime) throw new CustomError("Not a valid birthDay", 400)
    const response = await account.create({ first_name, last_name, email, phone, password, birthday: formattedDate });
    if (!response) throw new CustomError("internal server error", 500)
    sendMail(email);
    return response;
}

exports.updateAccount = async ({ data, userId }) => {
    const { email, birthday } = data;
    if (email) throw new CustomError("Bad request", 400);
    if (birthday) {
        const birthDate = new Date(birthday);
        const year = birthDate.getFullYear();
        const month = String(birthDate.getMonth() + 1).padStart(2, '0');
        const day = String(birthDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        data = { ...data, birthday: formattedDate }
        if (birthDate.getTime > new Date().getTime) throw new CustomError("Not a valid birthDay", 400)
    }
    let accountDetails = await account.findOne({ where: { uuid: userId } });
    if (!accountDetails) throw new CustomError("No account exists for userId", 404);
    try {
        const accountDet = await account.update(data, { where: { uuid: userId } });
        return accountDet;
    } catch (error) {
        console.log("error", error)
        throw new CustomError("Server Error", 500)
    }
}

exports.deleteAccount = async ({ userId }) => {
    console.log("userId", userId);
    const accountDetails = await account.findOne({where : {uuid: userId}});
    if(!accountDetails) throw new CustomError("account not found", 404)
    try {
        const del = await account.destroy({ where: { uuid: userId } });
        console.log("deleted", del)
        return del;
    } catch (error) {
        console.log("err2", error)
    }
    
}