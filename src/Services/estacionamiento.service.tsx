import axios from 'axios';
import { IEstacionamiento, IReporteCliente, IReservaConfirma, IReservation, IResponseDefault, ITarifa, ITarifaObj } from '../types';


export async function obtenerEstacionamiento(id: Number): Promise<IEstacionamiento[]> {
    const response = await axios.get('http://192.168.1.90:3100/estacionamiento/'+id, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IEstacionamiento[];
}


export async function obtenerTarifa(id: Number): Promise<ITarifa[]> {
    const response = await axios.get('http://192.168.1.90:3100/tarifario/'+id, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as ITarifa[];
}


export async function insertReservation(nuevaReserva: Partial<IReservation>): Promise<string> {
    const resultado = await axios.post('http://192.168.1.90:3100/reserva/', nuevaReserva, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return resultado.data;
}


export async function ObtieneReserva(idLocal: Number): Promise<IReservaConfirma[]> {
    const response = await axios.get('http://192.168.1.90:3100/reserva/'+idLocal, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IReservaConfirma[];
}

export async function ConfirmReservaId(idEstacion: Number, codTipo:Number, fInicio:String) {
    const idTipo = { codTipo, fInicio } ;
    const response = await axios.put('http://192.168.1.90:3100/reserva/'+idEstacion, idTipo, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data ;
}



export async function GetRerporteCliente(idUser: Number, ini: Date, fin: Date): Promise<IReporteCliente[]> {
    const datos = { idUser, ini, fin}
    const response = await axios.post('http://192.168.1.90:3100/reserva/reporte/', datos, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IReporteCliente[];
}

export async function actualizaEstacionamiento(idEstacion: Number, codNewEstado:Number) {
    const idTipo = { codNewEstado } ;
    const response = await axios.put('http://192.168.1.90:3100/estacionamiento/'+idEstacion, idTipo, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data ;
}



export async function registerStation(idLocal: Number): Promise<IReporteCliente[]> {
    const datos = { idLocal }
    const response = await axios.post('http://192.168.1.90:3100/estacionamiento/', datos, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IReporteCliente[];
}


