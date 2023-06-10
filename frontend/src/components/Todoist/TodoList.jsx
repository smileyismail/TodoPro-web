import React from "react";
import { Box, Typography } from "@mui/material";

import TodoTile from "./TodoTile";

const TodoList = ({ onRemove, onEdit, todos, onChecked, isLoading }) => {
  const reversedTodos = [...todos].reverse(); //we have to avoid modifiying the original array

  const unCheckedTodos = reversedTodos.filter((todo) => todo.checked === false);

  return (
    <>
      <Box width="100%" display="flex" flexDirection="column" gap={2}>
        {unCheckedTodos.map((todo) => (
          <TodoTile
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            onEdit={onEdit}
            onChecked={onChecked}
          />
        ))}
      </Box>
      {!isLoading && reversedTodos.length === 0 && (
        <Typography variant="h5">No Todo's available, add one !!</Typography>
      )}
    </>
  );
};

export default TodoList;
