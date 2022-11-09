import React, { useState, useContext } from "react";
import { userContext } from "../context/UserProvider";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { funcRegistro } from "../../api/registro.api";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  //  const { registerUser } = useContext(userContext);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await registerUser(email, password);
  //     const { data } = await funcRegistro({ email, password });
  //     console.log(data);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Registro exitoso",
  //       text: "Bienvenido a la plataforma",
  //     });
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Algo salió mal!",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const res = await funcRegistro(data);
    console.log(res.status);
    if (res.status === undefined) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Ahora puedes iniciar sesión",
      });
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal!",
      });
    }
  };

  return (
    <>
      <h1>Registro</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
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
          Volver al <a href="/login"> Login </a>
        </p>
        <Button variant="primary" type="submit">
          Registrate
        </Button>
      </Form>
    </>
  );
};

export default Registro;
