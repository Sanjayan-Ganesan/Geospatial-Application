const bcrypt =  require ('bcrypt');
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken')

const signup = async (req,res)=>{
    try {
     const {name,email,password} = req.body;
     const user = await UserModel.findOne({email});

     if(user){
        return res.status(409).json({message:'User Already Exist, You can Login',success: false})
     }

     const userModel = new UserModel({name,email,password});
     userModel.password = await bcrypt.hash(password,10);
     await userModel.save();

     res.status(200)
         .json({
            message: "Signup Successfully",
            sucess: true
         })
    } catch (err){
        res.status(500)
        .json({
            message: "Internal Server Error",
            success: false
        })
    }
}


const login = async (req,res)=>{
    try {
     const {email,password} = req.body;
     const user = await UserModel.findOne({email});
     const errorMsgEmail = 'Email is Wrong';
     const errorMsgPasswordValidation = 'Password Do not Match'


     if(!user){
        return res.status(403).json({message: errorMsgEmail ,success: false})
     }

     const IsPasswordEqual = await bcrypt.compare(password,user.password);
     if(!IsPasswordEqual){
        return res.status(403).json({message: errorMsgPasswordValidation ,success: false})
     }

     const jwtToken = jwt.sign(
        {email: user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn : '24h'}
     )

     res.status(200)
         .json({
            message: "Login Success",
            sucess: true,
            jwtToken,
            email,
            name: user.name
         })
    } catch (err){
        res.status(500)
        .json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = {
    signup,
    login
}