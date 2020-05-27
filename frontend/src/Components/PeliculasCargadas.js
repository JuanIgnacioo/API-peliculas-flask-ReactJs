import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import CardPeliAgregada from "./CardPeliAgregada";
import { Redirect, Link } from "react-router-dom";
import banner from "../Images/bannerCine.jpg";
import Loader from "react-loader-spinner";
import axios from "axios";
import fondonegro from "../Images/fondonegro.jpg";
import $ from "jquery";

import "./Buscador.css";
function PeliculasCargadas() {
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listAux, setListAux] = useState([]);
  const [encontrado, setEncontrado] = useState(false);

  const obtenerPeliculas = () => {
    setEncontrado(false);
    axios
      .get("http://localhost:5000/peliculas")
      .then((res) => {
        if (res !== null) {
          console.log(res.data);
          setEncontrado(true);
          setListado(res.data);
          setListAux(res.data);
          setLoading(false);
        } else {
          setLoading(true);
          setEncontrado(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscador = (e) => {
    let value = e.target.value;
    if (value === "") {
      setListAux(listado);
    } else {
      console.log("entro");
      setListAux(
        listado.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  const styleLoader = {
    position: "absolute",
    top: "50%",
    left: "60%",
    marginLeft: "-300px",
  };

  const body = {
    backgroundImage: `url(${fondonegro})`,
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "absolute",
    minHeight: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
  };

  return (
    <div style={body}>
      <div>
        <Header banner={banner} house="MARVEL" />
      </div>

      <div class="container" id="buscador" align="center">
        <div className="searchbar">
          <input
            className="search_input"
            id="buscadorSSJ"
            type="text"
            onChange={(e) => buscador(e)}
            placeholder="buscar"
            autoComplete="off"
          ></input>
        </div>
      </div>

      <div align="center">
        <Link to="/" className=" btn btn-primary mt-4">
          Home
        </Link>
      </div>

      {!encontrado ? (
        <h2 class="text-danger mt-3" align="center">
          Todavia no hay peliculas cargadas!
        </h2>
      ) : null}

      {loading ? (
        <div style={styleLoader}>
          {" "}
          <Loader type="Watch" color="#FDFEFF" height={150} width={150} />{" "}
          <h3 className="text-light">Cargando ... </h3>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3" align="center">
          {listAux.map((thing) => (
            <CardPeliAgregada id="card" thing={thing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PeliculasCargadas;
