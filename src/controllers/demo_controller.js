const {getUserDataService, addUserDataServices, updateUserDataServices, deleteUserDataServices}=require('../services/demo_service')

const getUserDataController=async(req,res)=>{
    callservices(getUserDataService,req,res)
}

const addUserDataController=async(req,res)=>{
    callservices(addUserDataServices,req,res)
}

const updateUserDataController=async(req,res)=>{
    callservices(updateUserDataServices,req,res)
}

const deleteUserDataController=async(req,res)=>{
    callservices(deleteUserDataServices,req,res)
}
const callservices=async(method,req,res)=>{
    try {
        var result=await method(req)
        res.status(200).json({
            status:result.status,
            message:result.message,
            data:result.data
        })
    } catch (error) {
        res.status(400).json({
            status:result.status,
            message:result.message,
            data:result.data
        })
    }
}

module.exports={
    getUserDataController,addUserDataController,updateUserDataController,deleteUserDataController
}