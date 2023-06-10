import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import colors from "../../utils/colors";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  textAlign: "center",
};

export default function ManageTodo(props) {
  // State variables
  const [values, setValues] = useState({
    title: "",
    description: "",
    checked: false,
  });
  const [errors, setErrors] = useState({});

  const {
    onSubmit,
    handelOpen,
    handelClose,
    isModalOpen,
    selectedTodo,
    isEditing,
    setIsEditing,
  } = props;

  useEffect(() => {
    // Update the form values when isEditing or selectedTodo changes
    if (isEditing) {
      setValues({
        title: selectedTodo.title,
        description: selectedTodo.description,
        checked: selectedTodo.checked,
      });
    } else {
      setValues({
        title: "",
        description: "",
        checked: false,
      });
    }
  }, [isEditing, selectedTodo]);

  // Event handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const handleOpen = () => {
    setIsEditing(false);
    return handelOpen();
  };
  const handleClose = () => {
    return handelClose();
  };

  function validate() {
    const newErrors = {};
    if (!values.title) {
      newErrors.title = "Enter a Title";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function submitHandler() {
    if (validate()) {
      const data = {
        title: values.title,
        description: values.description,
        checked: values.checked,
      };
      onSubmit(data);
      setValues({ title: "", description: "", checked: false });
      setErrors({});
      handleClose();
    }
  }

  return (
    <Box
      border={2}
      borderColor={colors.secondary}
      width="100%"
      padding={1}
      borderRadius={2}
      display="flex"
      justifyContent="center"
    >
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          bgcolor: colors.accentDark,
          fontSize: 18,
          color: colors.textLight,
          ":hover": {
            bgcolor: colors.accentLight,
          },
        }}
      >
        Add Todo
      </Button>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add Todo
          </Typography>
          {/* Title input */}
          <Box width="100%">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
            <Typography color="red">{errors && errors.title}</Typography>
          </Box>

          {/* Description input */}
          <Box width="100%">
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              type="text"
              multiline
              rows={3}
              value={values.description}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
            <Typography color="red">{errors && errors.description}</Typography>
          </Box>

          {/* Cancel and submit buttons */}
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                fontSize: 18,
                flex: 1,
                color: colors.textDark,
                ":hover": {
                  bgcolor: colors.accentLight,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={submitHandler}
              sx={{
                bgcolor: colors.accentDark,
                fontSize: 18,
                flex: 1,
                color: colors.textLight,
                ":hover": {
                  bgcolor: colors.accentLight,
                },
              }}
            >
              {isEditing ? "Save" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
