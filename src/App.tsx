import React, { useState, useEffect } from 'react';
import { obtenerToken, obtenerMenu } from './Services/authService';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import { AiOutlineGlobal, AiOutlineUser, AiOutlineThunderbolt, AiOutlineSearch, AiOutlinePoweroff } from 'react-icons/ai';

import ListaEstacionamiento from './pages/Estacionamiento/ListaEstaciamiento';
import Dashboard from './pages/Dashboard';
import NavBar from './components/navbar';
import { IModulos } from './types';
import RegisterUser from './pages/Login/registeruser';
import AutenticationUser from './pages/Login/autentication';
import ConfirmaReserva from './pages/Estacionamiento/confirmaReserva';
import DatosPersonales from './pages/Users/DatosPersonales';
import ReporteCliente from './pages/Reportes/ReporteCliente';
import Promociones from './pages/Estacionamiento/Promociones';
import RegistrarEstacionamiento from './pages/Estacionamiento/RegistrarEstacionamiento';
import ReporteTarifa from './pages/Reportes/ReporteTarifa';
import * as $ from 'jquery';
import { findDOMNode } from 'react-dom';
// import jquery = require("jquery");

interface ILogin{
  onAuthenticate: () => void;
}


function Login(props: ILogin) {

  return  <div className="container-fluid shadow-sm p-3 mb-5 bg-white rounded mt-5 cl-login" style={{ maxWidth: 480 }}>
            <Router>
              <div>
                <Switch>
                      <Route path="/autentication" > <AutenticationUser onAuthenticate= { props.onAuthenticate } ></AutenticationUser> </Route>
                      <Route path="/register" > <RegisterUser></RegisterUser> </Route>
                </Switch>
              </div>
            </Router>
          </div>

}

interface IAdminProps {
  onSignOut: () => void;
}



function Admin(props: IAdminProps) {

  const [modulos, setModulos] = useState<IModulos[]>([]);
  const [username, setUsername] = useState("");
  const [activeName, setactiveName] = useState("");
  const [active, setActive] = useState(false);

  const idPerfil = Number(localStorage.getItem("perfil-tc"));
  // console.log(idPerfil);
    useEffect(() => {
        async function cargaNav() {
            var menu = await obtenerMenu(idPerfil);
            // console.log(menu);
            setModulos(menu);
            const usuName = String(localStorage.getItem("nombres-tc"));
            setUsername(usuName);
        }

        setTimeout(() => {
            cargaNav();
        }, 500)
    }, []);

    const cerrarSesion = () => {
      localStorage.clear();
      props.onSignOut();
    }

    const handleToggle = () => {

      if(!active){
        setactiveName("nav-open");
        setActive(true);
      } else {
        setactiveName("");
        setActive(false);
      }
      
    }

  return <>
    <div className={"wrapper " + activeName}>
      <Router>
      <div className="sidebar" data-color="orange">
        <div className="logo">
          <a key="mihref" className="simple-text logo-normal">
            Travel Car
          </a>
        </div>

        <div className="sidebar-wrapper" id="sidebar-wrapper">
          
            {/* <h3>Lets go for a <FaBeer /></h3> */}
            <NavBar data={ modulos } ></NavBar>
            {/* <NavBar texto="Estacionamiento" ></NavBar> */}
          
        </div>
      </div>

      <div className="main-panel" id="main-panel">
        {/* Navbar */}
        <nav key="mynav" className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
          <div className="container-fluid">
            <div className="navbar-wrapper">
              <div className="navbar-toggle">
                <button type="button" className="navbar-toggler" onClick={ handleToggle }>
                  <span className="navbar-toggler-bar bar1"></span>
                  <span className="navbar-toggler-bar bar2"></span>
                  <span className="navbar-toggler-bar bar3"></span>
                </button>
              </div>
              <a key="miherf" className="navbar-brand" href="#pablo">{ username }</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-bar navbar-kebab"></span>
              <span className="navbar-toggler-bar navbar-kebab"></span>
              <span className="navbar-toggler-bar navbar-kebab"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navigation">
              {/* <form>
                <div className="input-group no-border">
                  <input type="text" value="" className="form-control" placeholder="Search..."></input>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <i> < AiOutlineSearch size={ 18 } /> </i>
                    </div>
                  </div>
                </div>
              </form> */}
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <a className="nav-link" href="#pablo">
                    <i> < AiOutlineThunderbolt size={25} /> </i>
                    <p>
                      <span className="d-lg-none d-md-block">Stats</span>
                    </p>
                  </a>
                </li> */}
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i> < AiOutlineGlobal size={25} /> </i>
                    <p>
                      <span className="d-lg-none d-md-block">Some Actions</span>
                    </p>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </li> */}
                <li className="nav-item">
                  <a key="mihref" className="nav-link powerOff" href="/autentication" onClick={ cerrarSesion }>
                    <i> < AiOutlinePoweroff size={25} /> </i>
                    <p>
                      <span className="d-lg-none d-md-block">Account</span>
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* End Navbar */}
        <div className="panel-header panel-header-sm">
        </div>

        <div className="content">
          <div className="row">
            <main role="main" className="col-sm-12 col-md-12">
              <Switch>
                    <Route exact path="/dashboard" > <Dashboard></Dashboard> </Route>
                    <Route path="/estacionamiento" > <ListaEstacionamiento></ListaEstacionamiento> </Route>
                    <Route path="/register" > <RegisterUser></RegisterUser> </Route>
                    <Route path="/reservas_estacionamientos"> <ConfirmaReserva></ConfirmaReserva> </Route>
                    <Route path="/datos_personales"> <DatosPersonales></DatosPersonales> </Route>
                    <Route path="/reporte_reserva"> <ReporteCliente></ReporteCliente> </Route>
                    <Route path="/reporte_general"> <ReporteCliente></ReporteCliente> </Route>
                    <Route path="/promociones_user"> <Promociones></Promociones> </Route>
                    <Route path="/register_station"> <RegistrarEstacionamiento></RegistrarEstacionamiento> </Route>
                    <Route path="/reporte_tarifa"> <ReporteTarifa></ReporteTarifa> </Route>
              </Switch>
            </main>
          </div>
        </div>
      </div>
      </Router>
    </div>
  </>

}



















function App(): JSX.Element {

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

    // comprobar si existe un token
    React.useEffect(() => {
        if (localStorage.getItem("travelcar-token")) {
            setIsAuthenticated(true);
        }
    }, []);

  
  if (!isAuthenticated) {
    return <Login onAuthenticate={ () => { setIsAuthenticated(true) }} />
  } 
  return <Admin onSignOut={() => { setIsAuthenticated(false) }} />

}

export default App;
