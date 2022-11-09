import axios from "axios";

export const funcRegistro = async (registro) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/register",
      registro
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const funcGetRegistro = async () =>
  await axios.get("http://localhost:4000/register");
export const funcGetRegistroById = async (id) =>
  await axios.get(`http://localhost:4000/register/${id}`);
export const funcUpdateRegistro = async (id, registro) =>
  await axios.put(`http://localhost:4000/register/${id}`, registro);
export const funcDeleteRegistro = async (id) =>
  await axios.delete(`http://localhost:4000/register/${id}`);
export const funcLogin = async (login) => {
  try {
    const response = await axios.post("http://localhost:4000/login", login);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
