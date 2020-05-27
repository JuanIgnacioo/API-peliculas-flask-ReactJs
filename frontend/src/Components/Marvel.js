import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import { Redirect, Link } from "react-router-dom";
import banner from "../Images/bannerMarvel.png";
import Loader from "react-loader-spinner";
import axios from "axios";
import fondonegro from "../Images/fondonegro.jpg";
import $ from "jquery";

import "./Buscador.css";
function Marvel() {
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(false);

  const [listAux, setListAux] = useState([]);

  const [mostrarOtro, setMostrarOtro] = useState("false");

  const obtenerPjs = () => {
    setLoading(true)
    axios
      .get("http://localhost:5000/marvel")
      .then((res) => {
        if (res !== null) {
          console.log(res.data);
          setListado(res.data);
          setListAux(res.data);
          setLoading(false);
        } else {
          setLoading(true);
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
    obtenerPjs();
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

      {loading ? (
        <div style={styleLoader}>
          {" "}
          <Loader type="Watch" color="#FDFEFF" height={150} width={150} />{" "}
          <h3 className="text-light">Cargando ... </h3>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3" align="center">
          {listAux.map((thing) => (
            <Card id="card" thing={thing} key={thing._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Marvel;
