const Task = require("../models/Task");

//GET all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findByUserId(userId);

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("error fetching tasks:,error");
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Create a new task
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, due_date } = req.body;
    console.log(req.body);

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create(userId, title, description, due_date);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    // Check if task exists and belongs to user
    const task = await Task.findById(taskId, userId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized",
      });
    }

    await Task.delete(taskId, userId);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
