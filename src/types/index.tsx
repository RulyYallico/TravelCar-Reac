/**
 * Esta interface servira para definir las props base de cada página de nuestro app
 */
 export interface IPageBaseProps {
    path?: string;
}

export interface IResponseDefault{
    success: boolean;
    message: string;
    data: string;
}

export interface IModulos {
    codmodulos: Number;
    picture: string;
    name: string;
    extension: string;
}


export interface IDropBox{
    codlocal: Number;
    nomlocal: string;
}


export interface IEstacionamiento{
    codestacionamiento: Number;
    sector: String;
    orden: Number;
    swstate: Number;
}


export interface ITarifa{
    codtarifarios: Number;
    detalle: String;
    precio: string;
    tipo: String
}

export interface ILocales{
    codLocal: Number;
    nombre: String;
}

export interface ITarifaObj{
    resultDia: ITarifa[];
    resultHora: ITarifa[];
}

export interface IReservation {
    codestacionamiento: Number;
    codusers: Number;
    Placa: String;
    reservado: String;
    costo: String;
    // DNI: Number;
    // Telefono: Number;
}



export interface IRegisterUSer{
    codUser: Number;
    codprofile: Number;
    surname: String;
    names: String;
    email: String;
    password: String; 
    phone: Number;
    address: String;
    nickname: String;
}

export interface IReservaConfirma{
    codestacionamiento: Number,
    "locale.nomlocal": Number, 
    "reserva.costo": String;
    swstate: Number, 
    "reserva.user.names" ?: String, 
    "reserva.user.surname" ?: String, 
    "reserva.reservado": Date, 
    "reserva.ingreso": Date, 
    "reserva.salida": Date, 
    "reserva.DNI": Number, 
    "reserva.Telefono": Number
}

export interface IReporteCliente{
    "estacionamientos.locale.nomlocal": String;
    "estacionamientos.codestacionamiento": Number;
    placa: String;
    ingreso: Date;
    salida: Date;
    costo: String;
}

export interface IReporteTarifa{
    detalle: String;
    precio: String;
}


export interface IUsers{
    surname: string;
    names: string;
    nick_name: string;
    address: string;
    email: string;
    phone: string;
    picture: string;
}