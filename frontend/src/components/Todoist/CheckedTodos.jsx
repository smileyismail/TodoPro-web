import React from "react";
import { Box } from "@mui/material";

import TodoTile from "./TodoTile";

const CheckedTodos = ({ onRemove, onEdit, todos, onChecked }) => {
  const checkedTodos = todos.filter((todo) => todo.checked === true);

  return (
    <>
      <Box width="100%" display="flex" flexDirection="column" gap={2}>
        {checkedTodos.map((todo) => (
          <TodoTile
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            onEdit={onEdit}
            onChecked={onChecked}
          />
        ))}
      </Box>
    </>
  );
};

export default CheckedTodos;
