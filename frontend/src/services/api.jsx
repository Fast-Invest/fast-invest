import axios from "axios";

export async function logar(data) {
  try {
    const response = await axios.post("/login", data);
    console.log("Usuário criado:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("erro: ", error.response.data);
    } else {
      console.error("error:", error.message);
    }
    return false;
  }
  return true;
}

export async function cadastrar(data) {
  try {
    const response = await axios.post("/usuario", data);
    console.log("Usuário criado:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("erro: ", error.response.data);
    } else {
      console.error("error:", error.message);
    }
    return false;
  }
  return true;
}
