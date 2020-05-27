import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

function CardCasting({ thing }) {
  const [verHeroe, estado] = useState("false");

  if (verHeroe === "true") {
    let dire = thing.id_hero;
    return <Redirect to={`/verHeroe/${dire}`} />;
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
        src={`https://image.tmdb.org/t/p/w500${thing.profile_path}`}
        style={styleImage}
      />
      <div class="card-body">
        <h5 class="card-title mb-2 text-danger ">
          {thing.name} / {thing.character}
        </h5>
        <button class="btn btn-primary mr-3" onClick={() => estado("true")}>
          Ver heroe
        </button>
      </div>
    </div>
  );
}
export default CardCasting;
