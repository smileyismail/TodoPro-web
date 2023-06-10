import { createSlice } from "@reduxjs/toolkit";

const initialTodoSliceState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialTodoSliceState,
  reducers: {
    setTodos: (state, action) => {
      const fetchedTodos = action.payload;

      return { ...state, todos: fetchedTodos };
    },

    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    updateTodo: (state, action) => {
      const { id, data } = action.payload;
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            ...data,
          };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    },

    checkTodo: (state, action) => {
      const { id, checked } = action.payload;
      let updatedTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: checked,
          };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    },
  },
});

export const todoSliceActions = todoSlice.actions;

export default todoSlice.reducer;
