// const connectDB=require('../../database');

// const getUserDataModel=async()=>{
//     try {
//         let q=`EXECUTE SP_GET_DEMO_CASE_DETAILS`;
//         return await executeQuery(q);
//     } catch (error) {
//         console.log(error)
//         throw new Error(error)
//     }
// }

// const executeQuery=async(query)=>{
//     try {
//         let pool=await connectDB;
//         return await pool.query(query)
//     } catch (error) {
//         console.log(error)
//         throw Error(error)
//     }
// }


// module.exports={
//     getUserDataModel,
//     executeQuery
// }


const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
    {
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      age: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true,
        select: false // Ensures password is not returned in query results
      },
      },
    {
        timestamps:true
    }

)
const employe=mongoose.model('employe',userSchema)

module.exports=employe