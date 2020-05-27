import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { getAPImovieCast } from "../Funciones/Funciones";

function CardPeliAgregada({ thing }) {
  const [verMovie, setVer] = useState(false);

  if (verMovie === true) {
    let dire = thing.id;
    return <Redirect to={`/peliculainfo/${dire}`} />;
  }
  const styleImage = {
    maxWidth: "19rem",
    maxWidht: "19rem",
    maxHeight: "18rem",
    minHeight: "18rem",
    marginTop: "50px",
  };

  return (
    <div>
      <img
        class="card-img-top"
        src={`https://image.tmdb.org/t/p/w500${thing.poster_path}`}
        style={styleImage}
      />
      <div class="card-body">
        <h5 class="card-title mb-2 text-danger ">{thing.title}</h5>
        <button class="btn btn-primary mr-3" onClick={() => setVer(true)}>
          Ver Pelicula
        </button>
      </div>
    </div>
  );
}
export default CardPeliAgregada;
