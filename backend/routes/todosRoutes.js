const express = require("express");

const todosController = require("../controllers/todosController");

const router = express.Router();

router.get("/get", todosController.getTodos);

router.post("/add", todosController.postTodo);

router.delete("/delete/:id", todosController.deleteTodos);

router.put("/update/:id", todosController.updateTodos);

router.put("/check/:id", todosController.checkTodo);

module.exports = router;
