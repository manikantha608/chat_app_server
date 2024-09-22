const UserModel = require("../models/UserModel")
const bcrypt = require("bcryptjs")
async function registerUser(req,res){
      try{
         const {name,email,password,profile_pic} = req.body;

         const checkEmail = await UserModel.findOne({email}) //{name,email,password,profile_pic}  //null
         if(checkEmail){
              return res.status(500).json({
                    message:"Already user exits",
                    error:true
              })      
         }

         const salt = await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password,salt)

         const payload = {
              name,
              email,
              password:hashPassword,
              profile_pic      
         }

         const user = new UserModel(payload)
         const userSave = await user.save()

         return res.status(200).json({
             message:"User created successfully",
             data:userSave,
             success:true       
         })
      }catch(err){
            return res.status(500).json({
             message:err.message || err,
             error:true
            })
      }
}

module.exports = registerUser;