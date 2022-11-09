import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Facturacion = () => {
  return (
    <>
      <h1>Facturacion</h1>
      <Button className="link" variant="danger">
        <NavLink to="/home" className="textButton">
          Volver al inicio
        </NavLink>
      </Button>
    </>
  );
};

export default Facturacion;
