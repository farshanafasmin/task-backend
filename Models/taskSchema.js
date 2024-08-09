const mongoose=require('mongoose')

// model schema
const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    duedate:{
        type:Date,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const tasks=mongoose.model("tasks",taskSchema)
module.exports=tasks