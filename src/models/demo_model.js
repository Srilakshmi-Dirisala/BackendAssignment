
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
        select: true // Ensures password is not returned in query results
      },
      },
    {
        timestamps:true
    }

)
const employe=mongoose.model('employe',userSchema)

module.exports=employe