import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Table,
  Modal,
  Col,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styleListaClientes.css";
import { FaRegTrashAlt, FaRegFileAlt } from "react-icons/fa";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [newDate, setNewDate] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "clientes"));
      setClientes(datos.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    obtenerDatos();
  }, []);

  const deleteClient = async (id) => {
    console.log(id);
    try {
      const docRef = doc(db, "clientes", id);
      await deleteDoc(docRef);

      setClientes(clientes.filter((cliente) => cliente.id !== id));
      Swal.fire("Cliente eliminado", "", "success");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const updateProduct = async (id, newDate) => {
    try {
      const docRef = doc(db, "clientes", id);
      await updateDoc(docRef, {
        cantidad: newDate.cantidad,
        precio: newDate.precio,
      });

      // setProductos(productos.filter((producto) => producto.id !== id));
      Swal.fire("Producto editado", "", "success");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const handleClickUpdate = (producto) => {
    console.log(producto);

    handleShow();
    setNewDate(producto.id);

    //  setProductos(producto.precio);
  };

  return (
    <Container>
      <h1>Lista de Clientes</h1>
      <Form className="d-flex mb-4 mt-4">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
      <Row>
        <Table className="tablaClientes table table-dark table-hover table-sm " responsive bordered>
          <thead >
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Direccion</th>
              <th>Localidad</th>
              <th>Provincia</th>
              <th>Telefono</th>
              <th>CUIT</th>
              <th>Email</th>
              <th>IVA</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.localidad}</td>
                <td>{cliente.provincia}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.cuit}</td>
                <td>{cliente.email}</td>
                <td>{cliente.iva}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteClient(cliente.id);
                    }}
                    variant="danger"
                  >
                    <FaRegTrashAlt />
                  </Button>

                  <Button
                    variant="warning"
                    onClick={() => {
                      handleClickUpdate(cliente);
                    }}
                  >
                    <FaRegFileAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      <Button className="link" variant="warning">
        <NavLink to="/home" className="textButton">
          Volver al inicio
        </NavLink>
      </Button>
      <Button className="link" variant="info">
        <NavLink to="/nuevo-cliente" className="textButton">
          Carga de Clientes
        </NavLink>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar clientes</Modal.Title>
        </Modal.Header>
        <Row>
          <Col>
            <Form className="formUpdateProductos">
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fernet"
                  name="nombre"
                  // onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="123"
                  name="precio"
                  // onChange={handleInputChange}
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
                  // onChange={handleInputChange}
                />
              </Form.Group>
              <Button type="submit" variant="success">
                Editar Producto
              </Button>{" "}
              <Button variant="danger">Anular Edicion</Button>{" "}
            </Form>
          </Col>
        </Row>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListaClientes;
