const jwt = require('jsonwebtoken');
const userModel=require('../models/userModel');
const bcrypt=require('bcrypt')
const { validateRegister, validateLogin } = require('../validations/authValidators');



module.exports.userRegister = function (req, res) {
    try {
        const { error, value } = validateRegister(req.body)
        if (error)  return res.status(422).json({ errors: error.details })
        userModel.findOne({username:value.username}).then(async(user)=>{
            if(user?.username) return res.status(422).json({ message:"Username already exists" })
            value.password= await bcrypt.hash(value.password, 10)
        userModel.create(value).then((response)=>{
            res.status(200).json({message:"Successfully registered"})
        }).catch((error)=>{
        res.status(501).json({ message: error.message });
        })
        }).catch((error)=>{
            res.status(501).json({ message: error.message });
        })           
          
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.userLogin =async function (req, res) {
    try {
        const { error, value } = validateLogin(req.body)
        if (error)  return res.status(422).json({ errors: error.details })
       userModel.findOne({username:value.username}).then((user)=>{
          if(user?.username){
            const {password, ...details}=user._doc
            bcrypt.compare(value.password, password)
            .then(status => {
               if(status) {
                const id = user._id
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: 3000,
                })
                res.status(200).json({auth: true, token: token, user:details }) 
               }
               else res.status(422).json({auth: false, message:'Incorrect password' })})       
            .catch(error => res.status(500).json({auth: false, message: error.message }))
        }
        else return res.status(422).json({auth: false, message:"User not found" }) 
       }).catch((error)=>{
        res.status(501).json({ message: error.message });
    })                     
    } catch (error) {
        res.status(500).json({auth: false, message: error.message });
    }
}
