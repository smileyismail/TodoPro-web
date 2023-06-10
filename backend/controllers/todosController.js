const todoModel = require("../models/todoModel");
const mongoose = require("mongoose");

exports.getTodos = async (req, res) => {
  const userId = req.headers.authorization;
  try {
    const todos = await todoModel.find({ userId: userId }); //return todos whose token is equal to token provided
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching todos." });
  }
};

exports.postTodo = async (req, res) => {
  const { title, checked, userId } = req.body;

  try {
    const todo = await todoModel.create({ title, checked, userId });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400);
    res.json({ err: err.message });
  }
};

exports.deleteTodos = async (req, res) => {
  const { id } = req.params;

  //checking if the _id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such todo" });
  }
  const todo = await todoModel.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ err: "No such todo" });
  }

  res.status(200).json(todo);
};

exports.updateTodos = async (req, res) => {
  const { id } = req.params;

  //checking if the _id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such todo" });
  }

  const todo = await todoModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!todo) {
    return res.status(404).json({ err: "No such todo" });
  }

  res.status(200).json(todo);
};

exports.checkTodo = async (req, res) => {
  const { id } = req.params;

  //checking if the _id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such todo" });
  }

  //updating the checked property of todo
  const todo = await todoModel.findOneAndUpdate(
    { _id: id },
    { checked: req.body.checked }
  );

  if (!todo) {
    return res.status(404).json({ err: "No such todo" });
  }

  res.status(200).json(todo);
};
