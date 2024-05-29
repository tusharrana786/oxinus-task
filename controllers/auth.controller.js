const {authService} = require('../service');

exports.createUser = async (req, res)=>{
    try {
      const account = await authService.create({data : req?.body})
      res.status(201).json({message : "user added successfully"})
    }
    catch (error) {
      res.status(error?.code || 500).json({message : error?.message});
    }
}

exports.loginUser = async (req, res)=>{
    try {
      const token = await authService.login({data : req?.body});
      res.status(200).json({token, message: "user loggedin successfully"});
    }
    catch(error) {
      res.status(error?.code || 500).json({message : error?.message});
    }
}