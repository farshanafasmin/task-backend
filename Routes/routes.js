const express=require('express')
const { register, login } = require('../Controllers/userController')
const { addTask, getUserTasks, getSingleTask, deleteTask, editTask } = require('../Controllers/taskController')

// create an object for router

const router=new express.Router()

// register
router.post('/user/register',register)

// login
router.post('/user/login',login)

// addtask
router.post('/user/addtask',addTask)

// get user projects
router.get('/user-tasks/:userId', getUserTasks);

// get single project
router.get('/user-stask/:taskId', getSingleTask);

// delete project
router.delete('/user/delete-task/:taskId',deleteTask)

// api for edit 

router.put('/edit-task/:taskId',editTask)


module.exports=router