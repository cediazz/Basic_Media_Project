import React from 'react';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sidebars.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsMapFill } from 'react-icons/bs';
import { BsFillUsbDriveFill } from 'react-icons/bs';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { BsFillHddStackFill } from 'react-icons/bs';
import { BsGraphUp } from 'react-icons/bs';


function Sidebar() {

  const [loggedIn, setLoggedIn] = useState(true); // Estado para comprobar si el usuario está logeado
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false)
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();




  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };



  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (

    <div className="flex-shrink-0 p-3  bg-light MySideBar " >
      <div className="d-flex align-items-center pb-3 mb-3   border-bottom">
        <img className="bi me-2" src={""} />
      </div>
      <ul className="list-unstyled ps-0 " >
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded " style={{ color: 'blue' }} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse1" aria-expanded="false">
            Gestión de Medios
          </button>
          <div className="collapse mt-1" id="dashboard-collapse1">
            <ListGroup >
              <ListGroup.Item action active={activeItem === "Gestionar Medios"} onClick={() => { handleItemClick("Gestionar Medios"); navigate("/gestionar-medios") }} >
                <BsFillUsbDriveFill /> Gestionar Medios
              </ListGroup.Item>
              <ListGroup.Item action active={activeItem === "Gestionar Campos"} onClick={() => { handleItemClick("Gestionar Campos"); navigate("/gestionar-campos") }} >
                <BsFillHddStackFill /> Gestionar Campos
              </ListGroup.Item>
              <ListGroup.Item action active={activeItem === "Gestionar Planos"} onClick={() => { handleItemClick("Gestionar Planos"); navigate("/gestionar-planos") }} >
                <BsMapFill /> Gestionar Planos
              </ListGroup.Item>
              <ListGroup.Item action active={activeItem === "Gestionar Categorías"} onClick={() => { handleItemClick("Gestionar Categorías"); navigate("/gestionar-categoria") }} >
                <BsFillFileEarmarkFill /> Gestionar Categorías
              </ListGroup.Item>
            </ListGroup>
          </div>
        </li>
        <li className="mb-1">
          <Link to="/planos" className="link-dark rounded" style={{ textDecoration: "none" }}><button className="btn btn-toggle align-items-center rounded " style={{ color: 'blue' }} >Planos</button></Link>

        </li>
        <li className="mb-1 border-top">
          <button className="btn btn-toggle align-items-center rounded mt-3 " style={{ color: 'blue' }} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse2" aria-expanded="false">
            Usuario:"Arrelgar"
          </button>
          <div className="collapse" id="dashboard-collapse2">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <Link to="/Login" className="link-dark rounded">Salir</Link>

            </ul>
          </div>
        </li>
      </ul>
    </div>


  );

}

export default Sidebar;
