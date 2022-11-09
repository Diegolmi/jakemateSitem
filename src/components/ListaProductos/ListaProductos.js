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
import "./styleTablaProductos.css";
import { FaRegTrashAlt, FaRegFileAlt } from "react-icons/fa";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [newDate, setNewDate] = useState()
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "productos"));
      setProductos(datos.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    obtenerDatos();
  }, []);

  const deleteProduct = async (id) => {
    console.log(id)
    try {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);

      setProductos(productos.filter((producto) => producto.id !== id));
      Swal.fire("Producto eliminado", "", "success");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const updateProduct = async ( id, newDate) => {
    
    try {
      const docRef = doc(db, "productos", id);
      await updateDoc(docRef, {
        cantidad: newDate.cantidad,
        precio: newDate.precio,
      });

      // setProductos(productos.filter((producto) => producto.id !== id));
      Swal.fire("Producto editado", "", "success");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }

  const handleClickUpdate = (producto) => {

      console.log(producto)
    
    handleShow()
    setNewDate(producto.id)
    
  //  setProductos(producto.precio);
  }


  return (
    <Container>
      <h1>Lista de Productos</h1>
      <Row>
        <Table className="tablaProductos" bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Producto</th>
              <th>precio</th>
              <th>cantidad</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>
                  {" "}
                  <Button
                    onClick={() => {
                      deleteProduct(producto.id);
                    }}
                    variant="danger"
                  >
                    <FaRegTrashAlt />
                  </Button>
                  <Button variant="info" onClick={() => {handleClickUpdate(producto)}}>
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
        <NavLink to="/productos" className="textButton">
          Carga de Productos
        </NavLink>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Productos</Modal.Title>
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

export default ListaProductos;
