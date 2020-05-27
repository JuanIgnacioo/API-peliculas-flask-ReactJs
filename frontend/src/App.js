import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./Components/Home";
import Marvel from "./Components/Marvel";
import Dc from "./Components/Dc";
import VerHeroe from "./Components/VerHeroe";
import ModificarHeroe from "./Components/ModificarHeroe";
import Agregar from "./Components/Agregar";
import VertTodos from "./Components/VerTodos";
import Peliculas from "./Components/Peliculas";
import PeliculasCargadas from "./Components/PeliculasCargadas";
import PeliculaInfo from "./Components/PeliculaInfo";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/marvel" component={Marvel} />
        <Route exact path="/dc" component={Dc} />
        <Route exact path="/agregar" component={Agregar} />
        <Route exact path="/todos" component={VertTodos} />
        <Route exact path="/peliculas" component={Peliculas} />
        <Route exact path="/verpeliculas" component={PeliculasCargadas} />

        <Route
          exact
          path="/verHeroe/:dire"
          render={(props) => {
            let idHeroe = String(props.match.params.dire);
            return <VerHeroe id={idHeroe} />;
          }}
        />

        <Route
          exact
          path="/peliculainfo/:dire"
          render={(props) => {
            let idPeli = String(props.match.params.dire);
            return <PeliculaInfo idpeli={idPeli} />;
          }}
        />

        <Route
          exact
          path="/modificar/:dire"
          render={(props) => {
            let idHeroe = String(props.match.params.dire);
            return <ModificarHeroe id={idHeroe} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
