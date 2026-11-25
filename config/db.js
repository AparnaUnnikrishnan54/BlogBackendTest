const dns=require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("MongoDB connected successfully");
        
    } catch (error) {
        console.log("MongoDB connection failed",error);
    }
}

module.exports=connectDB