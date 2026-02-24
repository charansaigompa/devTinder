const mongoose=require("mongoose");
const validator=require("validator")
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:50,

    },
   emailId: {
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
         minLength:4,
        maxLength:50,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Invalid email address"+value)
          }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:4,
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Invalid Password "+value)
          }
   }
       
    },
    age:{
        type:Number,
    },
   gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value))
        {
            throw new Error("Gender not valid")
        }
    }
   },
   about:{
    type:String,
    default:"This is default about of user",
    maxLength:100,
   },
   skills:{
    type:[String],
   },
   photoUrl:{
    type:String,
    default:"https://tse1.mm.bing.net/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?pid=Api&P=0&h=180",
    validate(value){
          if(!validator.isURL(value)){
            throw new Error("Invalid url "+value)
          }
   }
}},{
    timestamps:true,
});
module.exports =mongoose.model("User",userSchema)

