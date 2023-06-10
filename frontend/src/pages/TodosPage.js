import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ManageTodo from "../components/App/ManageTodo";
import TodoList from "../components/App/TodoList";

import { todoSliceActions } from "../store/todoSlice";
import colors from "../utils/colors";
import {
  getTodos,
  postTodo,
  deleteTodos,
  updateTodos,
  checkTodo,
} from "../utils/todoHttp";

const TodoistPage = () => {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [serverError, setServerError] = useState("");

  // Redux store variables
  const todos = useSelector((state) => state.todosStore.todos);
  const dispatch = useDispatch();

  // Event handlers
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  // Fetch todos from the server on component mount
  useEffect(() => {
    let isMounted = true; // Add a variable to track component mount state
    async function gettingTodos() {
      setIsLoading(true);
      setServerError("");
      try {
        const todos = await getTodos();
        if (isMounted) {
          dispatch(todoSliceActions.setTodos(todos));
        }
      } catch (err) {
        if (isMounted) {
          setServerError("Cannot fetch Todos");
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    }
    gettingTodos();

    return () => {
      isMounted = false; // Set the mounted state to false on cleanup
    };
  }, [dispatch]);

  // Submit todo handler for adding or updating todos
  async function submitTodoHandler(data) {
    setIsLoading(true);
    setServerError("");
    if (isEditing) {
      try {
        await updateTodos(selectedTodo.id, data);
        dispatch(
          todoSliceActions.updateTodo({ id: selectedTodo.id, data: data })
        );
      } catch (err) {
        setServerError("Cannot update Todo");
      }
    } else {
      try {
        const id = await postTodo(data);
        dispatch(todoSliceActions.addTodo({ id: id, ...data }));
      } catch (err) {
        setServerError("Cannot add Todo");
      }
    }
    setIsLoading(false);
  }

  // Delete todo handler
  async function deleteTodoHandler(id) {
    setServerError("");
    try {
      await deleteTodos(id);
      dispatch(todoSliceActions.removeTodo({ id: id }));
    } catch (err) {
      setServerError("Cannot delete Todo");
    }
  }

  // Edit todo handler
  function editTodoHandler(id) {
    setIsEditing(true);
    handleOpen();
    const selectedTodo = todos.find((todo) => todo.id === id);
    setSelectedTodo(selectedTodo);
  }

  // Check todo handler
  async function checkedTodoHandler(id, checked) {
    try {
      await checkTodo(id, checked);
      dispatch(todoSliceActions.checkTodo({ id: id, checked }));
    } catch (err) {
      setServerError("Cannot update Todo");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        maxWidth: 600,
        marginX: "auto",
        paddingTop: 12,
        gap: 5,
      }}
    >
      <ManageTodo
        onSubmit={submitTodoHandler}
        handelOpen={handleOpen}
        handelClose={handleClose}
        isModalOpen={isModalOpen}
        selectedTodo={selectedTodo}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      {isLoading && (
        <CircularProgress size={34} sx={{ color: colors.accentDark }} />
      )}
      {serverError && <Typography>{serverError}</Typography>}

      <TodoList
        onRemove={deleteTodoHandler}
        onEdit={editTodoHandler}
        onChecked={checkedTodoHandler}
        todos={todos}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default TodoistPage;
