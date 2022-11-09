import React from "react";
import Button from "react-bootstrap/Button";
import logo from "../../assets/img/logoBorde.png";
import "./styleIndex.css";

const Index = () => {
  return (
    <div>
      <img
        src={logo}
        className="logo"
        alt="logo de jake mate yerbas"
       
      />
      <h1>Sistema de Gestion Jake Mate</h1>
      <div className="button">
      <Button variant="success" onClick={() => window.location.href = "/login"  }>
          
            Ingresar
         
        </Button>{" "}
        
      </div>
    </div>
  );
};

export default Index;
