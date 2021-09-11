import { useEffect, useState } from "react";
import DropBox from "../../components/dropbox";
import { Title } from "../../components/global/Title";
import { obtenerLocales } from "../../Services/authService";
import { ConfirmReservaId, ObtieneReserva } from "../../Services/estacionamiento.service";
import { IDropBox, IReservaConfirma } from "../../types";
import TablaEstacionamientos from "./tablaEstacionamiento/TablaEstacionamientos";

function ConfirmaReserva() {

    const [locales, setLocales] = useState<IDropBox[]>([]);
    const [reserva, setReserva] = useState<IReservaConfirma[]>([]);

    useEffect(() => {
        async function cargaLocales() {
            var misLocales = await obtenerLocales();
            console.log(misLocales);
            setLocales(misLocales);
        }

        setTimeout(() => {
            cargaLocales();
        }, 500)
    }, []);

    function validaClick( e: any ) {
        e.preventDefault();
        const el = e.target;

        var elemento = document.querySelectorAll(".liLocal");
        for (var i = 0; i < elemento.length; i++) {
            elemento[i].classList.remove('active');
        }
        el.classList.add('active');

        const idLocal = el.getAttribute('id');
        // setslocal(idLocal);
        ListaReserva(idLocal);
    }

    const [statet, steStatet] = useState("clHide");
    const [statem, steStatem] = useState("clHide");
    const [state, setState] = useState("hidden");
    const [texto, setTexto] = useState("");
    const [codlocal, setCodlocal] = useState(0);

    const ListaReserva = async (codLocal: number) => {
        const result = await ObtieneReserva(codLocal);
        console.log(result);
        setCodlocal(codLocal);
        if(result.length > 0){
            setReserva(result);
            steStatet("clShow");
            steStatem("clHide");
        } else {
            steStatet("clHide");
            steStatem("clShow");
            setReserva([]);
        }
    }


    const confirmaEstacion = async (idEstacion: Number, idTipo: Number, fInicio: String) => {
        // console.log(idEstacion, idTipo, codlocal,fInicio);
        const update = await ConfirmReservaId(idEstacion, idTipo, fInicio);
        console.log(update);
        if (update.message.toUpperCase() == "OK") {
            setState("alert alert-primary clShow");
            ListaReserva(codlocal);
        } else {
            setState("alert alert-danger clShow");
        }
        setTexto(update.data);

        setTimeout(() => {
            setState("clHide");
        }, 8200)
    }

    return <>
        <div className="card">
            <Title texto="CONFIRMAR RESERVAS" color="black"></Title>
        </div>

        <div className="botonCenter">
            <div className="row">
                <DropBox datos={ locales } color="primary" onBtnClick={ validaClick }></DropBox>
            </div>
        </div>

        <div className="contentEst row">

            <div className="container-fluid">
                <div className={"alert alert-danger ErrorLogin " + statem } role="alert">
                    No Estacionamiento registrados.
                </div>
                <div className={ statet }>
                    <div className={ state } role="alert">
                        { texto }
                    </div>
                    <TablaEstacionamientos data={ reserva } onActivaEstations= { confirmaEstacion } ></TablaEstacionamientos>
                </div>
            </div>
            
        </div>
    </>
}

export default ConfirmaReserva;
