import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import CardMovie from "./CardMovie";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";

function Peliculas() {
  const [query, setQuery] = useState("");
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [encontrado, setEncontrado] = useState(false);

  const buscar = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3cee3748aaea0df0145414e5cb47570c&query=${query}`
      )
      .then((res) => {
        if (res.data.total_results == 0) {
          setEncontrado(false);
          setLoading(false);
          console.log(res.data);
        } else {
          setLoading(false);
          setEncontrado(true);
        }
        if (res.data.results.length > 10) {
          setListado(res.data.results.slice(0, 10));
        } else {
          setListado(res.data.results);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const styleLoader = {
    position: "absolute",
    top: "70%",
    left: "60%",
    marginLeft: "-300px",
  };

  return (
    <Fragment>
      <div className="jumbotron" align="center">
        <h1 className="display-3">Cargar una película</h1>
        <p className="lead">Ingrese un nombre de una película </p>
        <hr className="my-4" />
        <p class="text-info">Se muestran los primeros resultados.</p>

        <div align="center" className="col-sm-3">
          <form className="form " onSubmit={(e) => buscar(e)}>
            <input
              className="form-control"
              type="text"
              placeholder="Nombre"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary mt-3" type="submit">
              Buscar
            </button>
          </form>
        </div>

        {!encontrado ? (
          <p class="text-danger mt-3">Todavia no hay resultados!</p>
        ) : null}
        <Link to="/" type="button" className="btn btn-info mt-2">
          Home
        </Link>
      </div>

      {loading ? (
        <div style={styleLoader}>
          {" "}
          <Loader
            type="TailSpin"
            color="#63696E"
            height={150}
            width={150}
          />{" "}
          <h3>Cargando ... </h3>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3" align="center">
          {listado.map((thing) => (
            <CardMovie thing={thing} />
          ))}
        </div>
      )}
    </Fragment>
  );
}
export default Peliculas;
