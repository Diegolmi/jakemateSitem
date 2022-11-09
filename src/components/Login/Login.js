import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { userContext } from "../context/UserProvider";
import Swal from "sweetalert2";
import { funcLogin } from "../../api/registro.api";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { loginUsuario } = useContext(userContext);

  console.log(email, password, "email, password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const response = await funcLogin(data);
    if (response.status === 200) {
      console.log(response.data);
     await loginUsuario(response.data);

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",

        text: "Algo salió mal",
      });
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p>
          Aun no estas registrado? <a href="/registro">Registrate</a>
        </p>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </>
  );
};

export default Login;
