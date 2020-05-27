import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import fondonegro from "../Images/fondonegro.jpg";

function ModificarHeroe({ id }) {
  const [biografia, setBiografia] = useState("");
  const [imagenes, setCantidad] = useState("");
  const [character, setCharacter] = useState("");
  const [house, setHouse] = useState("");
  const [images, setImages] = useState([]);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [equipamiento, setEquipamiento] = useState("");
  const [identi, setId] = useState("");

  //Peticion para traer el listado actualizado
  const encontrarHeroe = () => {
    axios
      .get("http://localhost:5000/listarTodos")
      .then((res) => {
        console.log(res.data);

        let heroeBuscado = res.data.filter((hero) => hero._id === id);
        console.log(heroeBuscado);
        setBiografia(heroeBuscado[0].biography);
        setCantidad(heroeBuscado[0].cantidad_imagenes);
        setCharacter(heroeBuscado[0].character);
        setHouse(heroeBuscado[0].house);
        setImages(heroeBuscado[0].images);
        setBiografia(heroeBuscado[0].biography);
        setName(heroeBuscado[0].name);
        setYear(heroeBuscado[0].year);
        setId(heroeBuscado[0]._id);
        setEquipamiento(heroeBuscado[0].equipamiento);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const modificarHeroe = (e) => {
    e.preventDefault();
    return axios
      .post("http://localhost:5000/modificar", {
        biography: biografia,
        name: name,
        character: character,
        year: year,
        house: house,
        images: images,
        equipamiento: equipamiento,
        id: identi,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Heroe Modificado!",
          text: "Se modifico correctamente",
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

  useEffect(() => {
    encontrarHeroe();
  }, []);

  return (
    <div style={body}>
      <div align="center">
        <div class="jumbotron">
          <h1 class="display-4 ">Modificar SuperHeroe</h1>
          <p class="lead ">Modificar SuperHeroe.</p>
          <hr class="my-4" />
          <p>(Aplicacion hecha por Juan Ignacio Curtoni).</p>
          <Link to="/">
            <a class="btn btn-primary btn-lg text-light" href="#" role="button">
              Volver al Home
            </a>
          </Link>
        </div>
      </div>

      <div align="center">
        <form className="col-sm-4" onSubmit={modificarHeroe}>
          <div class="form-group">
            <h2 className="text-light">Heroe a modificar : {name}</h2>
            <label for="exampleFormControlSelect1" class="text-light">
              Seleccionar Casa
            </label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setHouse(e.target.value)}
            >
              <option value="MARVEL" class="text-dark">
                MARVEL
              </option>
              <option value="DC" class="text-dark">
                DC
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="nombreheroe" class="text-light">
              Nombre del Heroe
            </label>
            <input
              type="text"
              class="form-control"
              id="nombreheroe"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div class="form-group">
            <label for="nombreheroe" class="text-light">
              Character
            </label>
            <input
              type="text"
              class="form-control"
              id="nombreheroe"
              aria-describedby="emailHelp"
              onChange={(e) => setCharacter(e.target.value)}
            ></input>
          </div>

          <div class="form-group">
            <label for="nombreheroe" class="text-light">
              YEAR
            </label>
            <input
              type="number"
              class="form-control"
              id="nombreheroe"
              aria-describedby="emailHelp"
              onChange={(e) => setYear(e.target.value)}
            ></input>
          </div>

          <div class="form-group">
            <label for="biografi" class="text-light">
              Biografia
            </label>
            <textarea
              class="form-control"
              id="biografi"
              rows="3"
              onChange={(e) => setBiografia(e.target.value)}
            >
              {biografia}
            </textarea>
          </div>

          <div class="form-group">
            <label for="equipment" class="text-light">
              Equipamiento
            </label>
            <input
              class="form-control"
              id="equipment"
              onChange={(e) => setEquipamiento(e.target.value)}
            ></input>
          </div>

          <button type="submit" class="btn btn-primary">
            Modificar
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModificarHeroe;
