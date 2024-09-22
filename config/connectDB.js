const mongoose = require('mongoose')

// async function connectDB(){
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)

//         const connection = mongoose.connection

//         connection.on('connected',()=>{
//             console.log("Connect to DB")
//         })

//         connection.on('error',(error)=>{
//             console.log("Something is wrong in mongodb ",error)
//         })
//     } catch (error) {
//         console.log("Something is wrong ",error)
//     }
// }

// module.exports = connectDB

const connectDB = async ()=>{
    try{
       const connect = await mongoose.connect(process.env.MONGODB_URI);
       console.log("Server is connected to Database")  
    }catch(err){
        console.log("Server is not-connected to Database")            
    }               
}
module.exports = connectDB