
// import express
const express=require('express')

// create server
const taskServer=express()

// connect with front end
const cors=require('cors')
taskServer.use(cors())

taskServer.use(express.json())

// import router
const router = require('./Routes/routes')
taskServer.use(router)

// convert all incoming json data to js

// import dotenv package and cofigure it

require('dotenv').config()

// import node mongodb connection file

require('./DB-Connection/connection')


// port set

const PORT=4000

taskServer.listen(PORT,()=>{
    console.log(`-------------- Task Server Started At ${PORT} -----------------`);
    
})


// resolve api request

taskServer.get('/',(req,res)=>{
    res.send("get request recieved")
})