import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import "./styleFormNewClient.css";
const FormNewClient = () => {
  const [clientes, setClientes] = useState({
    nombre: "",
    apellido: "",
    cuit: Number,
    direccion: "",
    email: "",
    iva: Boolean,
    localidad: "",
    provincia: "",
    telefono: Number,
  });

  const handleInputChange = (event) => {
    setClientes({
      ...clientes,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Seguro quiere cargar este cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Cargar",
      denyButtonText: `No cargar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      const cargando = async () => {
        if (result.isConfirmed) {
          try {
            const docRef = await addDoc(collection(db, "clientes"), {
              nombre: clientes.nombre,
              apellido: clientes.apellido,
              cuit: clientes.cuit,
              direccion: clientes.direccion,
              email: clientes.email,
              iva: clientes.iva,
              localidad: clientes.localidad,
              provincia: clientes.provincia,
              telefono: clientes.telefono,
            });
            console.log("Document written with ID: ", docRef.id);
            Swal.fire("Cargado!", "", "success");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else if (result.isDenied) {
          Swal.fire("Cliente no cargado", "", "info");
        }
      };
      cargando();
    });
  };

  return (
    <>
      <Container>
        <h1>Carga de Clientes</h1>
        <Row>
            <Form onSubmit={enviarDatos} className="formCargaClientes">
          <Col>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="nombre"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="apellido"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="direccion"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Localidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="localidad"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="provincia"
                  onChange={handleInputChange}
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Fernet"
                  name="telefono"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cuit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Fernet"
                  name="cuit"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Fernet"
                  name="email"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  onChange={handleInputChange}
                  name="iva"
                  type="checkbox"
                  label="Iva"
                />
              </Form.Group>
              <Button type="submit" variant="success">
                Cargar Cliente
              </Button>{" "}
              <Button variant="danger">Anular Carga</Button>{" "}
          </Col>
            </Form>
          <Col>
            <Button className="link" variant="warning">
              <NavLink to="/home" className="textButton">
                Volver al inicio
              </NavLink>
            </Button>
            <Button className="link" variant="info">
              <NavLink to="/lista-cliente" className="textButton">
                Listado de Clientes
              </NavLink>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormNewClient;
