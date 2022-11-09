import React, { useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { userContext } from "../context/UserProvider";

const Home = () => {
  const { signOutUser } = useContext(userContext);

  return (
    <>
      <h3>Bienvenido al Sistema de Gestion de Jake Mate</h3>
      <h4>Elegi lo que queres hacer</h4>
      <Container>
        <Row>
          <Col>
            <Button className="link" variant="warning">
              <NavLink to="/productos" className="textButton">
                Ver los Productos
              </NavLink>
            </Button>
          </Col>
          <Col>
            <Button className="link" variant="primary">
              <NavLink to="/nuevo-cliente" className="textButton">
                Lista de Clientes
              </NavLink>
            </Button>
          </Col>
          <Col>
            <Button className="link" variant="danger">
              <NavLink to="/facturacion" className="textButton">
                Facturacion
              </NavLink>
            </Button>
          </Col>
        </Row>
        <Button className="link" variant="danger" onClick={signOutUser}>
          <NavLink to="/" className="textButton">
            Cerrar Sesion
          </NavLink>
        </Button>
      </Container>
    </>
  );
};

export default Home;
