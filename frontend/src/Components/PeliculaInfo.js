import React, { useState, useEffect } from "react";
import axios from "axios";
import fondonegro from "../Images/fondonegro.jpg";
import { Player, BigPlayButton } from "video-react";
import { getAPItrailer, obtenerHeroe } from "../Funciones/Funciones";
import { Redirect, Link } from "react-router-dom";
import "../../node_modules/video-react/dist/video-react.css";

import CardCasting from "./CardCasting";
import YouTube from "react-youtube";

function PeliculaInfo({ idpeli }) {
  const [listado, setListado] = useState([]);

  const [cast, setCast] = useState([]);
  const [idd, setId] = useState("");
  const [overview, setOverview] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [title, setTitle] = useState("");
  const [urlVideo, setUrlVideo] = useState("");

  const [verHeroe, estado] = useState("false");
  const [idCharacter, setIdCharacter] = useState("");

  const [arrayHeroes, setArrayHeroes] = useState([]);
  const [encontrado, setEncontrado] = useState(false);

  //Peticion para traer el listado actualizado
  const traerPeliculas = () => {
    axios
      .get("http://localhost:5000/peliculas")
      .then((res) => {
        if (res !== null) {
          console.log(res.data);
          // let aux = res.data.filter(peli => peli.id == idpeli)
          // console.log(aux)
          let peliculaBuscada = res.data.filter((peli) => peli.id == idpeli);
          console.log(peliculaBuscada);
          setTitle(peliculaBuscada[0].title);
          setId(peliculaBuscada[0].id);
          setOverview(peliculaBuscada[0].overview);
          setPosterPath(peliculaBuscada[0].poster_path);
          setReleaseDate(peliculaBuscada[0].release_date);
          setIdCharacter(peliculaBuscada[0].cast[0].id_hero);

          const aux = peliculaBuscada[0].cast.filter((cosa) => cosa.id_hero);
          setArrayHeroes(aux);

          //    console.log(peliculaBuscada[0].cast)

          getAPItrailer(idpeli).then((res) => {
            if (res.results[0].key) {
              setEncontrado(true);
              setUrlVideo(res.results[0].key);
              console.log(res.results[0].key);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const styleImage = {
    maxWidth: "19rem",
    maxWidht: "19rem",
    maxHeight: "18rem",
    minHeight: "18rem",
    marginTop: "50px",
  };

  useEffect(() => {
    traerPeliculas();
  }, []);

  return (
    <div style={body}>
      <h2 className="text-light" align="center">
        Trailer{" "}
      </h2>
      {!encontrado ? (
        <p class="text-danger" align="center">
          No se encontro Trailer para esta pelicula!
        </p>
      ) : null}
      <div align="center">
        <YouTube widht={500} height={500} videoId={urlVideo}></YouTube>
      </div>

      {/* <div align="center" className="mt-2">
                <Player
                src={`https://www.youtube.com/watch?v=${urlVideo}`}
                width={500}
                height={500}
                muted ={false}
                fluid ={false}
                >
               
                <BigPlayButton position="center"/>
                </Player>
            </div> */}

      <div align="center" className="mt-1">
        <Link to="/">
          <a class="btn btn-primary btn-sm m-2" href="#" role="button">
            Volver al Home
          </a>
        </Link>
      </div>

      <div align="center">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          class="img-fluid"
          style={styleImage}
        />
      </div>

      <div class="container">
        <div>
          <h3 className="mb-3  mt-4 text-light" align="center">
            {title}
          </h3>
          <figcaption className="text-justify text-xs-left text-light ">
            {overview}
          </figcaption>
        </div>
        <div class="col-md-4">
          <h3 class="my-3 text-light">Detalles</h3>
          <ul>
            <li class="text-light">Pelicula : {title} </li>
            <li class="text-light">Fecha Lanzamiento: {releaseDate} </li>
          </ul>
        </div>
      </div>

      <div>
        <h1 className="text-light" align="center">
          Actores / Heroes que interpretan :{" "}
        </h1>
        <div className="row row-cols-1 row-cols-md-3" align="center">
          {arrayHeroes.map((thing) => (
            <CardCasting id="card" thing={thing} key={thing._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PeliculaInfo;
