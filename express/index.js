const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {endpoint}=require('../config');
const connectDB=require("../database")
const userData=require('../src/routes/demo_route')

module.exports=()=>{
    connectDB();
    const app=express();
    app.use((req,res,next)=>{
        const timestamp=new Date().toISOString();
        const{method,url,headers}=req;
        const accessToken=headers.authorization || 'N/A';
        console.log(`[${timestamp}] ${method}: ${url}, AccessToken:"${accessToken}"`);
        next();
    })
    app.use(cors());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use((error,request,response,next)=>{
        if (error!== null){
            return response.json({status:401,message:"Invalid json",error:error})
        }
        next();
    });
    app.use(endpoint,userData)
    return app;
}

