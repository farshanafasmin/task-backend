const tasks = require("../Models/taskSchema");

// add task
exports.addTask = async (req, res) => {
    const { task, description, duedate, userId } = req.body;

    console.log("Received task data:", req.body); // Log the received data

    try {
        const existingTask = await tasks.findOne({ task });
        if (existingTask) {
            return res.status(400).json(`${existingTask.task} already exists! Add a new one.`);
        }

        const newTask = new tasks({
            task,
            description,
            duedate,
            userId
        });

        await newTask.save();
        console.log("Task saved:", newTask); // Log the saved data
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(400).json("Add task API failed");
    }
};


// view all tasks of user

exports.getUserTasks = async (req, res) => {
    const userId = req.params.userId; 

    try {
        const userTasks = await tasks.find({ userId });
        if (userTasks.length > 0) {
            res.status(200).json(userTasks);
        } else {
            res.status(404).json({ message: "No tasks found for this user" })
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch tasks" })
    }
}

// view task by taskid
exports.getSingleTask = async (req, res) => {
    const { taskId } = req.params; 

    try {
        const singleTask = await tasks.findById(taskId); 
        if (singleTask) {
            res.status(200).json(singleTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(400).json({ error: "Failed to fetch task" });
    }
};

// delete task by taskid

exports.deleteTask = async (req, res) => {

    const { taskId } = req.params

    try {
        const deletedTask = await tasks.findByIdAndDelete(taskId )
        res.status(200).json(deletedTask)
    }
    catch (error) {
        res.status(400).json(error)
    }

}

exports.editTask = async (req, res) => {
    const { taskId } = req.params;
    const { task, description, duedate } = req.body;

    try {
     
        const updatedTask = await tasks.findByIdAndUpdate(
            taskId, 
            { task, description, duedate },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: "Failed to update task" });
    }
};
