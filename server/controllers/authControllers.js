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
            bcrypt.compare(value.password, checkUser.password)
            .then(status => status ? res.status(200).json({ message: "Login success" }) : res.status(422).json({ message:'Incorrect password' }))
            .catch(error => res.status(500).json({ message: error.message }))
        }
        else return res.status(422).json({ message:"User not found" })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
