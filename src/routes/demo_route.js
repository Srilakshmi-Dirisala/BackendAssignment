const express=require('express');
const { getUserDataController, addUserDataController, updateUserDataController, deleteUserDataController}=require("../controllers/demo_controller");
var router=express.Router();

router.get('/getUserData',getUserDataController)

router.post('/addUserData',addUserDataController)

router.put('/updateUserData/:id',updateUserDataController)

router.delete('/deleteUserData/:id',deleteUserDataController)

module.exports=router