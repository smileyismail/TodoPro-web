import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import colors from "../../utils/colors";

const TodoTile = ({ todo, onRemove, onEdit, onChecked }) => {
  function deleteHandler(id) {
    onRemove(id);
  }

  function editHandler(id) {
    onEdit(id);
  }

  function handelChecked(e) {
    const checked = e.target.checked;
    onChecked(todo.id, checked);
  }

  return (
    <Box
      bgcolor={colors.secondary}
      width="100%"
      padding={1}
      borderRadius={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={todo.checked}
              onChange={handelChecked}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 30,
                  color: colors.accentDark,
                },
              }}
            />
          }
          label="Done"
          labelPlacement="bottom"
        />
      </Box>

      <Box flex={1}>
        <Typography variant="h5" fontWeight="bold">
          {todo.title}
        </Typography>
      </Box>

      <Box>
        <IconButton
          size="large"
          onClick={() => {
            editHandler(todo.id);
          }}
        >
          <BorderColorIcon sx={{ fontSize: 30, color: colors.textDark }} />
        </IconButton>
        <IconButton
          size="large"
          onClick={() => {
            deleteHandler(todo.id);
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 30, color: colors.danger }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TodoTile;
