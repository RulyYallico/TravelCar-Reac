import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, NavLink , Redirect, LinkProps
  } from "react-router-dom";

import * as Icons from 'react-icons/ai';
import { IModulos } from "../types";

interface INavMenu {
    data: IModulos[];
}


function NavBar(props: INavMenu)  {
    return <>
        <ul id="ulModulos" className="nav" key="100">
            {props.data.map(modulo => (
                <li id={ modulo.codmodulos.toString() } key={modulo.codmodulos.toString()}> 
                    <NavLink 
                            key={ Number(modulo.codmodulos) } 
                            to={ "/"+modulo.extension } 
                            className="item" 
                            activeClassName="active"
                            id={ modulo.codmodulos.toString() }>
                        <i> < Icons.AiFillBook /> </i>
                        <p> { modulo.name }  </p>
                    </NavLink>
                </li>
            ))}
        </ul>
    </>

}

export default NavBar;