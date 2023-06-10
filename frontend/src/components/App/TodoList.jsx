import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import TodoTile from "./TodoTile";

import colors from "../../utils/colors";

const TodoList = ({ onRemove, onEdit, todos, onChecked, isLoading }) => {
  const reversedTodos = [...todos].reverse(); //we have to avoid modifiying the original array

  const unCheckedTodos = reversedTodos.filter((todo) => todo.checked === false);
  const checkedTodos = todos.filter((todo) => todo.checked === true);

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

      <Divider
        variant="fullWidth"
        color={colors.accentDark}
        sx={{ height: 2, width: "100%" }}
      />

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

export default TodoList;
