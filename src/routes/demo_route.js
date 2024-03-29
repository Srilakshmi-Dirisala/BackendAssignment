const express=require('express');
const { getUserDataController, addUserDataController, updateUserDataController, deleteUserDataController, getUserAggregateDataController, signinController}=require("../controllers/demo_controller");
var router=express.Router();

router.get('/getUserData',getUserDataController)

router.post('/addUserData',addUserDataController)

router.put('/updateUserData/:id',updateUserDataController)

router.delete('/deleteUserData/:id',deleteUserDataController)

router.post('/signin',signinController)

/****Aggregate Functions */
router.get('/getUserAggregateData',getUserAggregateDataController)

module.exports=router