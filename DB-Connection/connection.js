
// import mongoose

const mongoose=require('mongoose')


const connectionString = process.env.DATABASE

// using mongoose connect

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((data) => {
    console.log("mongo db atlas connected to task server");
}).catch((err) => {
    console.log("mongo db connection failed");
})
