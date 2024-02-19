const employe = require('../models/demo_model');
const getUserDataModel=require('../models/demo_model')
const bcrypt = require('bcrypt');
const getUserDataService=async()=>{
    try {
      
        const employee=await getUserDataModel.find({})
       // console.log("ppppp",employee);
        return{status: 200,message:'success',data:employee}
    } catch (error) {
        console.log("error",error);
        throw new Error 
    }
}

const addUserDataServices=async(req,res)=>{
   
        const { name, email, age, country, password } = req.body;
        try {
            const hashedPassword=await bcrypt.hash(password,10)
            const user = new employe({
                name,
                email,
                age,
                country,
                password: hashedPassword // Save hashed password to the database
              });

              const newUser = await user.save();
         // console.log("nnnn",newUser)
        // const employee=await getUserDataModel.find({})
       // console.log("ppppp",employee);
        return{status: 200,message:'Data added successfully',data:[]}
    } catch (error) {
        console.log("error",error);
        throw new Error 
    }
}


const updateUserDataServices=async(req,res)=>{
   const {id}=req.params
    const { name, email, age, country, password } = req.body;
   // console.log("emial",req.body)
    try {
       let user=await employe.findById(id);
       if(!id){
        return{status: 404,message:'Data not found',data:[]}
       }
       if(name) user.name=name;
       if (email) user.email = email;
       if (age) user.age = age;
       if (country) user.country = country;
       if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

         user  = await user.save();
    //  console.log("nnnn",user)
    // const employee=await getUserDataModel.find({})
   // console.log("ppppp",employee);
    return{status: 200,message:'Data updated successfully',data:[]}
} catch (error) {
    console.log("error",error);
    throw new Error 
}
}


const deleteUserDataServices=async(req,res)=>{
    const {id}=req.params
    
    
     try {
        let user=await employe.findById(id);
        if(!user){
         return{status: 404,message:'User not found',data:[]}
        }
       await employe.findByIdAndDelete(id);
     
     return{status: 200,message:'user Deleted successfully',data:[]}
 } catch (error) {
     console.log("error",error);
     throw new Error 
 }
 }
 
 const getUserAggregateDataServices=async(req,res)=>{
 
    
    
     try {
       
        const result = await employe.aggregate([
            // Group by country and calculate the count of users in each country
            {
              $group: {
                _id: "$country",
                count: { $sum: 1 },
                averageAge: { $avg: "$age" }
              }
            },
            // Project the fields and rename _id to country
            {
              $project: {
                _id: 0,
                country: "$_id",
                count: 1,
                averageAge: 1
              }
            },
            // Calculate the total number of users
            {
              $group: {
                _id: null,
                totalUsers: { $sum: "$count" },
                averageAge: { $avg: "$averageAge" },
                countries: { $push: { country: "$country", count: "$count" } }
              }
            }
          ]);
      
          // Output the aggregated data
          console.log("Total Users:", result[0].totalUsers);
          console.log("Average Age:", result[0].averageAge);
          console.log("Users by Country:", result[0].countries);
     const res={
         "totalUsers":result[0].totalUsers,
         "averageAge":result[0].averageAge,
         "countries": result[0].countries

     }
     return{status: 200,message:'user Deleted successfully',data:res}
 } catch (error) {
     console.log("error",error);
     throw new Error 
 }
 }
module.exports={
    getUserDataService,addUserDataServices,updateUserDataServices,deleteUserDataServices,getUserAggregateDataServices
}