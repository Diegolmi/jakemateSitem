import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
import{ db } from "../../firebase/firebaseConfig";

import "./styleFormProduct.css";
const FormProduct = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    id: "",
    precio: "",
    cantidad: "",
    stock: "",
  });

  const handleInputChange = (event) => {

    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Seguro quiere cargar este producto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Cargar",
      denyButtonText: `No cargar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      const cargando = async () => {
        if (result.isConfirmed) {
          try {
            const docRef = await addDoc(collection(db, "productos"), {
              cantidad: datos.cantidad,
              id: datos.id,
              nombre: datos.nombre,
              precio: datos.precio,
            });
            console.log("Document written with ID: ", docRef.id);
            Swal.fire("Cargado!", "", "success");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else if (result.isDenied) {
          Swal.fire("Producto no cargado", "", "info");
        }
      };
      cargando();
    });
  };

  return (
    <>
      <Container>
        <h1>Carga de Productos</h1>
        <Row>
          <Col>
            <Form onSubmit={enviarDatos} className="formCargaProductos">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="nombre"
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  onChange={handleInputChange}
                />
              </Form.Group> */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="123"
                  name="precio"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="123"
                  name="cantidad"
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Seleccionar Imagen</Form.Label>
                <Form.Control type="file" name="imagen"  onChange={handleInputChange}/>
              </Form.Group> */}
              <Button type="submit" variant="success">
                Cargar Producto
              </Button>{" "}
              <Button variant="danger">Anular Carga</Button>{" "}
            </Form>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200" className="imagen" rounded />
            <Button className="link" variant="warning">
              <NavLink to="/home" className="textButton">
                Volver al inicio
              </NavLink>
            </Button>
            <Button className="link" variant="info">
              <NavLink to="/lista-productos" className="textButton">
                Listado de Productos
              </NavLink>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormProduct;
