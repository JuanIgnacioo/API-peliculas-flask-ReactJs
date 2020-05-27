import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { getAPImovieCast } from "../Funciones/Funciones";

function CardMovie({ thing }) {
  const [verMovie, setVer] = useState(false);

  const agregarHeroe = () => {
    getAPImovieCast(thing.id).then((res) => {
      return axios
        .post("http://localhost:5000/agregarPelicula", {
          id: thing.id,
          release_date: thing.release_date,
          poster_path: thing.poster_path,
          overview: thing.overview,
          title: thing.title,
          cast: res.cast,
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "Pelicula Agregada!",
            text: "Se agrego correctamente",
            imageUrl:
              "https://i0.pngocean.com/files/158/205/64/5bbc3d0762e88-thumb.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
          }).then((result) => {
            if (result.value) {
              let link = "/";
              window.location.href = link;
            }
          });
        })
        .catch((err) => {
          throw err.response.data;
        });
    });
  };

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

        <button class="btn btn-primary mr-3" onClick={() => agregarHeroe()}>
          Cargar Pelicula
        </button>
      </div>
    </div>
  );
}
export default CardMovie;
