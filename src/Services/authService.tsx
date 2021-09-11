import axios from 'axios';
import { IDropBox, IModulos, IRegisterUSer, IReporteTarifa, IUsers } from '../types';


interface ITokenResponse {
    success: boolean;
    message: string;
    data: string;
    idPerfil: number;
    idUser: number;
    nombre: string;
    apellidos: string;
}

export async function obtenerToken(email: string, password: string): Promise<ITokenResponse> {
    const data = { email, password };
    const response = await axios.post('http://192.168.1.90:3100/auths/signin', data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data as ITokenResponse;
}


export async function obtenerMenu(codPerfil: Number): Promise<IModulos[]> {
    const response = await axios.get('http://192.168.1.90:3100/modulos/'+codPerfil, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IModulos[];
}

export async function obtenerDatosUser(codUserd: Number): Promise<IUsers> {
    const response = await axios.get('http://192.168.1.90:3100/users/'+codUserd, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IUsers;
}

export async function obtenerLocales(): Promise<IDropBox[]> {
    const response = await axios.get('http://192.168.1.90:3100/locales', {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IDropBox[];
}



export async function insertUser(newUser: Partial<IRegisterUSer>): Promise<ITokenResponse> {
    const response = await axios.post('http://192.168.1.90:3100/users', newUser, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data ;
}


export async function updateUsers(UpUser: Partial<IRegisterUSer>, idUser: Number): Promise<ITokenResponse> {
    const response = await axios.put('http://192.168.1.90:3100/users/'+ idUser , UpUser, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data ;
}


export async function GetTarifasDia(idLocal: Number): Promise<IReporteTarifa[]> {
    const response = await axios.get('http://192.168.1.90:3100/tarifario/dias/'+ idLocal, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IReporteTarifa[];
}


export async function GetTarifasHoras(idLocal: Number): Promise<IReporteTarifa[]> {
    const response = await axios.get('http://192.168.1.90:3100/tarifario/horas/'+ idLocal, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(response);
    return response.data as IReporteTarifa[];
}