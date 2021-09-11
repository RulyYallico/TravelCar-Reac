import React, { useState } from 'react';
import { IDropBox, IEstacionamiento, IPageBaseProps, IReservation, ITarifa } from '../../types/index';
import { Title } from '../../components/global/Title';
import '../../assets/css/estacionamientos.css';
// ../assets/css/
import '../../assets/css/bootstrap.min.css';

import swal from 'sweetalert';
import { Modal, Button, Form, InputGroup, Row} from 'react-bootstrap';
import DropBox from '../../components/dropbox';
import { useEffect } from 'react';
import { obtenerLocales } from '../../Services/authService';
import LlenaEstacionamiento from './llenaEstacionamiento';
import { insertReservation, obtenerEstacionamiento, obtenerTarifa } from '../../Services/estacionamiento.service';
import LlenaTarifa from './LlenaTarifa';
import { AiFillDollarCircle } from 'react-icons/ai';


export default function ListaEstacionamiento(props: IPageBaseProps) {

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setIdestaciona(0);}
    const handleShow = () => setShow(true);

    const myalert = (tipo:Number) => {
        /*
            1 = libre
            2 = proceso de reserva
            3 = reservado
            4 = inactivo
        */
        // console.log(tipo);
        if(tipo == 2){
            swal({
                title: "Alerta",
                text: "El estacionamiento seleccionado esta en proceso de reserva.",
                icon: "warning"
            });
        }
        if(tipo == 3){
            swal({
                title: "Alerta",
                text: "El estacionamiento seleccionado esta ocupado.",
                icon: "warning"
            });
        }
        if (tipo == 4) {
            swal({
                title: "Alerta",
                text: "El estacionamiento seleccionado esta inactivo",
                icon: "error"
            });
        }
        if (tipo == 5) {
            swal({
                title: "Alerta",
                text: "Aún no esta activo el estacionamiento",
                icon: "error"
            });
        }
    }

    const [locales, setLocales] = useState<IDropBox[]>([]);
    const [slocal, setslocal] = useState(0);

    useEffect(() => {
        async function cargaLocales() {
            var misLocales = await obtenerLocales();
            setLocales(misLocales);
        }

        setTimeout(() => {
            cargaLocales();
        }, 500)
    }, []);

    const [estacionamiento, setEstacionamiento] = useState<IEstacionamiento[]>([]);
    const [msjesta, setMsjesta] = useState("clHide");

    function validaClick( e: any ) {
        e.preventDefault();
        const el = e.target;

        var elemento = document.querySelectorAll(".liLocal");
        for (var i = 0; i < elemento.length; i++) {
            elemento[i].classList.remove('active');
        }
        el.classList.add('active');

        const idLocal = el.getAttribute('id');
        setslocal(idLocal);
        ListaEstacionamiento(idLocal);
        listaTarifa(idLocal);

    }

    const [costod, setCostod] = useState(0) ;
    const [costoh, setCostoh] = useState(0) ;
    const [costot, setCostot] = useState(0) ;
    const validaTarifaDia = ( e: any ) => {
        e.preventDefault();
        // costo del dia
        const ed = e.target;
        const value = ed.options[ed.selectedIndex].value;
        setCostod(value);
    }

    const validaTarifaHora = ( e: any ) => { 
        e.preventDefault(); 
        const el = e.target; 
        const value = el.options[el.selectedIndex].value; 
        setCostoh(value); 
    } 

    function calCosto() {
        // let tDias = costod;
        // let tHoras = costoh;
        let total: number = Number(costod) + Number(costoh);
        // console.log(total);
        setCostot(total);
    }

    const ListaEstacionamiento = async (localId: Number) => {
        // console.log(localId);
        const result =  await obtenerEstacionamiento(localId);
        // console.log(result);
        if (result.length > 0) {
            setEstacionamiento(result);
            setMsjesta("clHide");
        } else {
            setEstacionamiento([]);
            setMsjesta("clShow");
        }
    }

    const [idestaciona, setIdestaciona] = useState(0);
    function RegistraEstacionamiento (e: any) {
        e.preventDefault();
        const el = e.target;
        const idEstacionamiento = el.getAttribute('id');
        const state = el.getAttribute('itemid');

        if (state==1) {
            handleShow();
            setIdestaciona(idEstacionamiento);
            // Llama a la carga de tarifarios
        } else {
            setIdestaciona(0);
            myalert(state);
        }
        setValidated(false);
    }

    const [tarifaD, setTarifad] = useState<ITarifa[]>([]);

    const listaTarifa = async (idLocal: Number) => {
        // console.log(idLocal);
        const result = await obtenerTarifa(idLocal);
        // console.log(result);
        if (result.length > 0) {
            setTarifad(result);
            setMsjesta("clHide");
        } else {
            setTarifad([]);
            setMsjesta("clShow");
        }
    }

    const [validated, setValidated] = useState(false);

    const EnviaRegistro = (e: any) => {
        e.preventDefault();
        var el = e.target;
        const newReservation: Partial<IReservation> = {}
        
        if(e.target["txtPlaca"].value == '' || e.target["txtFechaReserva"].value == '' || e.target["txtPrecio"].value == ''){
            return;
        }

        newReservation.codestacionamiento = idestaciona;
        newReservation.codusers = 1;
        newReservation.Placa = e.target["txtPlaca"].value;
        // newReservation.DNI = e.target["txtDni"].value;
        // newReservation.Telefono = e.target["txtCell"].value;
        newReservation.reservado = e.target["txtFechaReserva"].value;
        newReservation.costo = e.target["txtPrecio"].value;
        guardaReserva(newReservation);
        setValidated(true);
    }

    const guardaReserva = async (newReserva: Partial<IReservation>) => {
        console.log(newReserva);
        const result = await insertReservation(newReserva);
        // console.log(result);
        ListaEstacionamiento(slocal);
        setShow(false);
    }

    return <>
        <div className="card">
            <Title texto="ESTACIONAMIENTOS" color="black"></Title>
        </div>
        
        <div className="contentEst row">
            <p>
                Para poder realizar un estacionamiento verifique el estado del mismo, la hubicación que elija sera donde te estacionaras llegando a la cochera.
            </p>
        </div>
        <div className="botonCenter">
            <div className="row">
                <DropBox datos={ locales } color="primary" onBtnClick={ validaClick }></DropBox>
            </div>
        </div>
        <br />
        <p className={ msjesta }><div className="alert alert-primary" role="alert">No hay estacionamiento para la cochera seleccionada.</div></p>
        <div className="contentEst row">
            <LlenaEstacionamiento data={ estacionamiento } onBtnClick={ RegistraEstacionamiento } ></LlenaEstacionamiento>
        </div>


        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={ EnviaRegistro }>
                <Modal.Header closeButton >
                    <Modal.Title className="titleModal">Reservar estacionamiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <Form.Group className="mb-3" controlId="formPlaca">
                        <Form.Label>Ingrese place vehicular:</Form.Label>
                            <Form.Control required type="text" placeholder="Placa vehicular" name="txtPlaca" />
                            <Form.Control.Feedback type="invalid">
                                Por favor, Ingrese la placa del vehículo.
                            </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formDNI">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control required type="number" placeholder="Numero DNI" name="txtDni" />
                        <Form.Control.Feedback type="invalid">
                            Por favor, ingrese su DNI.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>telefono</Form.Label>
                        <Form.Control required type="number" placeholder="Numero Celular" name="txtCell" />
                        <Form.Control.Feedback type="invalid">
                            Por favor, ingrese su Telefono.
                        </Form.Control.Feedback>
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="formFecha">
                        <Form.Label>Fec. Reserva</Form.Label>
                        <Form.Control required type="datetime-local" placeholder="Fecha Reserva" name="txtFechaReserva" />
                        <Form.Control.Feedback type="invalid">
                            Por favor, ingrese la fecha de reserva.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formHoras">
                        <Form.Label>Tiempo de reserva</Form.Label>
                        
                        <Form.Control.Feedback type="invalid">
                            Por favor, ingrese la fecha de reserva.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3 clBordeRow ">
                        <Form.Group controlId="formDias">
                                <LlenaTarifa tipo={1} texto="Seleccione" datos={ tarifaD } color="primary" onBtnClick={ validaTarifaDia }></LlenaTarifa>
                        </Form.Group>
                        &nbsp;&nbsp;
                        <Form.Group controlId="formHoras">
                                <LlenaTarifa tipo={2} texto="Seleccione" datos={ tarifaD } color="primary" onBtnClick={ validaTarifaHora }></LlenaTarifa>
                        </Form.Group>
                        &nbsp;&nbsp;
                        <Button className="btn btn-success clBtnSmall" onClick={ calCosto } > <AiFillDollarCircle /> </Button>
                        &nbsp;&nbsp;
                        <Form.Group controlId="formHoras" className="imputsm">
                            <Form.Control required value={ costot.toString() } type="text" placeholder="Precio" name="txtPrecio" disabled />
                        </Form.Group>
                    </Row>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button type="submit" variant="primary" > 
                    {/* handleClose */}
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}
