const jwt = require('jsonwebtoken');
const userModel=require('../models/userModel');
const bcrypt=require('bcrypt')
const { validateRegister, validateLogin } = require('../validations/authValidators');



module.exports.userRegister =async function (req, res) {
    try {
        const { error, value } = validateRegister(req.body)
        if (error)  return res.status(422).json({ errors: error.details })
        const checkUser= await userModel.findOne({username:value.username})           
        console.log(checkUser);
        if(checkUser) return res.status(422).json({ message:"Username already exists" })
        value.password= await bcrypt.hash(value.password, 10)
        userModel.create(value).then((response)=>{
            res.status(200).json({message:"Successfully registered"})
        }).catch((err)=>{
        res.status(501).json({ message: err.message });
        })  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.userLogin =async function (req, res) {
    try {
        const { error, value } = validateLogin(req.body)
        if (error)  return res.status(422).json({ errors: error.details })
        const checkUser= await userModel.findOne({username:value.username})           
        if(checkUser){
            const {password, ...details}=checkUser._doc
            bcrypt.compare(value.password, checkUser.password)
            .then(status => {
               if(status) {
                const id = checkUser._id
                const token = jwt.sign({id}, "jwtSecret", {
                    expiresIn: 3000,
                })
                res.status(200).json({auth: true, token: token, user:details }) 
               }
               else res.status(422).json({auth: false, message:'Incorrect password' })})       
            .catch(error => res.status(500).json({auth: false, message: error.message }))
        }
        else return res.status(422).json({auth: false, message:"User not found" })
        
    } catch (error) {
        res.status(500).json({auth: false, message: error.message });
    }
}
