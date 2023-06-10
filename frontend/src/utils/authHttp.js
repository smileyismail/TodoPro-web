import axios from "axios";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

export async function signUpUser(email, password) {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  const userId = res.data.email;
  return userId;
}

export async function logInUser(email, password) {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  const userId = res.data.email;
  return userId;
}
