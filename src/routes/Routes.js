import React, { useContext } from "react";
import { userContext } from "../components/context/UserProvider";
import { Routes, Route } from "react-router-dom";

import Index from "../../src/components/Index/Index.js";
import FormProduct from "../../src/components/NuevoProducto/FormProduct.js";
import ListaProductos from "../components/ListaProductos/ListaProductos.js";
import Login from "../components/Login/Login.js";
import Registro from "../components/Registro/Registro.jsx";
import Home from "../components/Home/Home.jsx";
import FormNewClient from "../components/nuevoCliente/FormNewClient";
import ListaClientes from "../components/listaClientes/ListaClientes";
import Facturacion from "../components/facturacion/Facturacion";

const Rutas = () => {
  const { user } = useContext(userContext);

  console.log(user, "user")

  // if (user === false) {
  //   return <p>loading...</p>;
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Registro />} />
      </Routes>
      {user ? (
        <>
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/productos" element={<FormProduct />} />
          </Routes>
          <Routes>
            <Route path="/lista-productos" element={<ListaProductos />} />
          </Routes>
          <Routes>
            <Route path="/nuevo-cliente" element={<FormNewClient />} />
          </Routes>
          <Routes>
            <Route path="/lista-cliente" element={<ListaClientes />} />
          </Routes>
          <Routes>
            <Route path="/facturacion" element={<Facturacion />} />
          </Routes>
        </>
      ) :  null }
    </>
  );
};

export default Rutas;
