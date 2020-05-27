import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { render } from "react-dom";
import Header from "./Header";
import fondonegro from "../Images/fondonegro.jpg";

import MARVEL from "../Images/bannerMarvel.png";
import DC from "../Images/dclogo.jpg";

function VerHeroe({ id }) {
  const [biografia, setBiografia] = useState("");
  const [imagenes, setCantidad] = useState("");
  const [character, setCharacter] = useState("");
  const [house, setHouse] = useState("");
  const [images, setImages] = useState([]);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [equipamiento, setEquipamiento] = useState("");
  const [iden, setIden] = useState("");

  const [arrayPeliculas, setArrayPeliculas] = useState([]);

  const [encontrado, setEncontrado] = useState(false);
  const [tieneEquipo, setTieneEquipo] = useState(false);

  //Peticion para traer el listado actualizado
  const encontrarHeroe = () => {
    axios
      .get("http://localhost:5000/listarTodos")
      .then((res) => {
        console.log(res.data);

        let heroeBuscado = res.data.filter((hero) => hero._id === id);

        setBiografia(heroeBuscado[0].biography);

        setCharacter(heroeBuscado[0].character);
        setHouse(heroeBuscado[0].house);
        setImages(heroeBuscado[0].images);
        setCantidad(heroeBuscado[0].images.length);
        console.log(imagenes);
        setBiografia(heroeBuscado[0].biography);
        setName(heroeBuscado[0].name);
        setYear(heroeBuscado[0].year);
        if (heroeBuscado[0].equipment) {
          setEquipamiento(heroeBuscado[0].equipment);
          setTieneEquipo(true);
        }
        setIden(heroeBuscado[0]._id);
        const aux = heroeBuscado[0].movies.filter((pelis) => pelis.id);
        setArrayPeliculas(aux);
        setEncontrado(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarHeroe = ({ iden }) => {
    return axios
      .post("http://localhost:5000/eliminar", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Heroe Eliminado!",
          text: "Se elimino correctamente",
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

  const cambiarBanner = () => {
    if (house === "MARVEL") {
      return MARVEL;
    } else {
      return DC;
    }
  };

  useEffect(() => {
    encontrarHeroe();
  }, []);

  const styleImage = {
    maxWidth: "27rem",
    maxHeight: "18rem",
  };

  return (
    <div style={body}>
      <Header banner={cambiarBanner(iden)} />

      <div align="center" className="mt-4">
        <Carousel
          width={450}
          showArrows={true}
          dynamicHeight={true}
          align="center"
        >
          {images.map((img) => {
            return (
              <div>
                <img alt="" style={styleImage} src={img} />
              </div>
            );
          })}
        </Carousel>
      </div>

      <div align="center" className="mt-1">
        <Link to="/">
          <a class="btn btn-primary btn-sm m-2" href="#" role="button">
            Volver al Home
          </a>
        </Link>
      </div>
      <div class="container">
        <div>
          <h3 className="mb-3  mt-4 text-light " align="center">
            {name}
          </h3>
          <figcaption className="text-justify text-xs-left text-light ">
            {biografia}
          </figcaption>
        </div>

        <div align="right">
          <h3 className="text-danger">Peliculas cargadas donde aparece</h3>
          {!encontrado ? (
            <p class="text-danger">Todavia no hay resultados!</p>
          ) : null}
          <ul className="list-group col-sm-4">
            {arrayPeliculas.map((thing) => (
              <Link to={`/peliculainfo/${thing.id}`}>
                <li class="list-group-item text-center">{thing.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div class="col-md-4">
          <h3 class="my-3 text-light">Detalles</h3>
          <ul>
            <li class="text-light">Character : {character} </li>
            <li class="text-light">House : {house} </li>
            <li class="text-light">Año : {year}</li>
            <li class="text-light">Cantidad Imagenes : {imagenes} </li>
            <li class="text-light">
              Equipamiento :{" "}
              {!tieneEquipo ? (
                <p class="text-danger"> No tiene equipo</p>
              ) : null}{" "}
              {equipamiento}{" "}
            </li>
          </ul>
        </div>

        <Link to={`/modificar/${id}`}>
          <a class="btn btn-primary btn-sm m-2" href="#" role="button">
            Editar Personaje
          </a>
        </Link>

        <Link onClick={() => eliminarHeroe(iden)}>
          <a class="btn btn-danger btn-sm" href="#" role="button">
            Eliminar Personaje
          </a>
        </Link>
      </div>
    </div>
  );
}
export default VerHeroe;
