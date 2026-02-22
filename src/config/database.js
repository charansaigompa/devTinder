const mongoose=require("mongoose")
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://gompacharansai:Xu0f4NyWhWdSBJgp@charansainode.geeuua8.mongodb.net/devTinder")

}

module.exports=connectDB
