import axios from "axios";

const BASE_URL = "https://todopro.onrender.com";

export async function getTodos() {
  const userId = localStorage.getItem("userId");
  const res = await axios.get(`${BASE_URL}/api/todos/get`, {
    headers: {
      authorization: userId,
    },
  });
  const data = await res.data;
  const todos = [];

  for (let item of data) {
    const todo = {
      id: item._id,
      ...item,
    };

    todos.push(todo);
  }

  return todos;
}

export async function postTodo(data) {
  const userId = localStorage.getItem("userId");
  const res = await axios.post(`${BASE_URL}/api/todos/add`, {
    ...data,
    userId: userId,
  });
  return res.data._id;
}

export async function deleteTodos(id) {
  await axios.delete(`${BASE_URL}/api/todos/delete/${id}`);
}

export async function updateTodos(id, data) {
  await axios.put(`${BASE_URL}/api/todos/update/${id}`, data);
}

export async function checkTodo(id, checked) {
  await axios.put(`${BASE_URL}/api/todos/check/${id}`, { checked });
}
