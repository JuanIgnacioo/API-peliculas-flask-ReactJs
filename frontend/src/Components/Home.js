import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import versus from "../Images/marvelVsDc.jpg";
import Header from "./Header";
import "./Home.css";
import fondonegro from "../Images/fondonegro.jpg";
function Home() {
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
        <Header banner={versus} />
      </div>
      <h2 className="text-light" align="center">Elija una opcion : </h2>
      <div className="homeHeroes">
        <div className="m">
          <ul class="test-menu">
            <li class="test-menu__item">
              <Link to="/marvel">
                <a class="test-menu__link" title="example">
                  HEROES MARVEL
                </a>
              </Link>
            </li>

            <li class="test-menu__item">
              <Link to="/dc">
                <a class="test-menu__link" title="example">
                  HEROES DC
                </a>
              </Link>
            </li>

            <li class="test-menu__item">
              <Link to="/todos">
                <a class="test-menu__link" title="example">
                  MARVEL & DC
                </a>
              </Link>
            </li>

            <li class="test-menu__item">
              <Link to="/agregar">
                <a class="test-menu__link" title="example">
                  AGREGAR HEROE
                </a>
              </Link>
            </li>

            <li class="test-menu__item">
              <Link to="/peliculas">
                <a class="test-menu__link" title="example">
                  CARGAR UNA PELICULA
                </a>
              </Link>
            </li>

            <li class="test-menu__item">
              <Link to="/verpeliculas">
                <a class="test-menu__link" title="example">
                  PELICULAS CARGADAS
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
