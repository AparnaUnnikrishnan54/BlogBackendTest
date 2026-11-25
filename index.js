require('dotenv').config()
const express=require('express')
const cors=require('cors')
const connectDB=require('./config/db')
const router=require('./routes/routes')

const app=express()

app.use(cors())
app.use(express.json())

app.use(router)

app.get('/',(req,res)=>{
    res.send('Blog server is running')
    
})
const PORT=process.env.PORT
connectDB()
app.listen(PORT,()=>{
    console.log(`Serving running at ${PORT}`);
})