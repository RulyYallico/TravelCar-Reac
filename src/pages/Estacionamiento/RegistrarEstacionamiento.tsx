import { useEffect, useState } from "react";
import { Title } from "../../components/global/Title";
import { obtenerLocales } from "../../Services/authService";
import { actualizaEstacionamiento, obtenerEstacionamiento, registerStation } from "../../Services/estacionamiento.service";
import { IDropBox, IEstacionamiento, ILocales } from "../../types";
import LlenaLocal from "./LlenaLocal";
import TablaEstacConfig from "./tablaEstacConfig.tsx/TablaConfig";
import swal from 'sweetalert';

function RegistrarEstacionamiento() {

    const [codLocal, setCodLocal] = useState(0);
    const [local, setLocal] = useState<IDropBox[]>([]);
    const [estac, setEstac] = useState<IEstacionamiento[]>([]);

    useEffect(() => {
        async function cargaLocales() {
            var misLocales = await obtenerLocales();
            if(misLocales.length > 0){
                setLocal(misLocales);
            }
        }

        setTimeout(() => {
            cargaLocales();
        }, 500)
    }, []);

    function changeLocal(e: any) {
        e.preventDefault();
        const ed = e.target;
        const codigoLocal = ed.options[ed.selectedIndex].value;
        setCodLocal(codigoLocal);
        llenaEstacionamiento(codigoLocal);
    }

    const llenaEstacionamiento = async (codLocal: Number) => {
        const data = await obtenerEstacionamiento(codLocal);
        setEstac(data);
    }

    // idEsta; Number, estado:Number
    const activaEstacionamiento = async (idEsta: Number, estado:Number) => {
        let newState = 0;
        let textSawl = "";
        let textConf = "";
        if(estado==4) { 
            newState = 1;
            textSawl = "Esta seguro de activar el estacionamiento?";
            textConf = "Estacionamiento activado."
        } else {
            newState = 4
            textSawl = "Esta seguro de desactivar el estacionamiento?"
            textConf = "Estacionamiento desactivado."
        };
        await actualizaEstacionamiento(idEsta, newState);
        swal({
            title: "Alerta",
            text: textSawl,
            icon: "success",
            
        });
         
        llenaEstacionamiento(codLocal);
        
    }

    const registraEstacionamiento = async () => {
        if (codLocal > 0) {
            const result = await registerStation(codLocal);
            console.log(result);
            swal({
                title: "Alerta!",
                text: "Estacionamiento registrado exitosamente.",
                icon: "success"
            });
            llenaEstacionamiento(codLocal);
        } else {
            swal({
                title: "Alerta!",
                text: "Seleccione una sede.",
                icon: "warning"
            });    
        }
    }



    return <>
        <div className="content">
            <div className="row">
                <div className="card">
                    <Title texto="REGISTRAR ESTACIONAMIENTOS" color="black"></Title>
                </div>
            </div>
        </div>
        <div className="button-container">
            <div className="row">
                <div className="col-sm-10">
                    <LlenaLocal data = { local } onBtnClick = { changeLocal } ></LlenaLocal>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-primary btn-lg" onClick={ registraEstacionamiento }>Registrar</button>
                </div>
            </div>
            <br />
            <div className="row">
                <TablaEstacConfig data={ estac } onActivaEstations={ activaEstacionamiento }></TablaEstacConfig>
            </div>
        </div>
        
    </>
}


export default RegistrarEstacionamiento;