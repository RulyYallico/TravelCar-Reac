import moment from "moment";
import { AiOutlineCheck, AiOutlineClose, AiOutlineDollar } from "react-icons/ai";
import { isNull } from "util";
import { IReservaConfirma } from "../../../types";

interface IProps{
    reserva: IReservaConfirma;
    onActivaEstation: (idEstacion: Number, idTipo: Number, fInicio: String) => void;
}

function TablaEstacionamientosFila(props: IProps) {

    /*
        1 = libre
        2 = proceso de reserva
        3 = reservado
        5 = costo calculado
        4 = inactivo
    */

    const date = new Date();

    return <tr>
        <td>{ props.reserva.codestacionamiento }</td>
        <td>{ props.reserva["locale.nomlocal"] }</td>
        <td><span className="label label-primary">{ 
            (props.reserva.swstate==1?'Libre':
            (props.reserva.swstate==2?'Proceso de reserva':
            (props.reserva.swstate==3?'Reservado':
            (props.reserva.swstate==4?'Inactivo':
            (props.reserva.swstate==5?'Precio':''))))) 
            }</span>
        </td>
        {/* <td>{ 
            (props.reserva["reservas.user.surname"]=='null'?'':props.reserva["reservas.user.surname"]) + " " + 
            (props.reserva["reservas.user.names"]=='null'?'':props.reserva["reservas.user.names"]) }</td> */}
        <td> { props.reserva["reserva.user.names"] } { props.reserva["reserva.user.surname"] } </td>
        {/* <td>{ new Date(props.reserva["reservas.reservado"]) }</td> */}
        {/* new Date(props.reserva["reservas.reservado"]).toISOString().replace('T', ' ').substring(0, 19) */}
        {/* <td>{ ( (new Date(props.reserva["reservas.reservado"]).toISOString().replace('T', ' ').substring(0, 19) == '1970-01-01 00:00:00') ? '' : new Date(props.reserva["reservas.reservado"]).toISOString().replace('T', ' ').substring(0, 19) ) }</td> */}
        
        {/* <td> { props.reserva["reserva.ingreso"] } </td>
        <td> { props.reserva["reserva.ingreso"] } </td> */}
        
        <td>{ ( moment(props.reserva["reserva.ingreso"]).isValid() ? new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) : '' ) }</td>
        <td>{ ( moment(props.reserva["reserva.salida"]).isValid() ? new Date(props.reserva["reserva.salida"]).toISOString().replace('T', ' ').substring(0, 19) : '' ) }</td>
        
        
        <td> { props.reserva["reserva.DNI"] } </td>
        <td> { (isNull(props.reserva["reserva.costo"])? '' : 'S/. '+props.reserva["reserva.costo"] ) } </td>
        <td> { props.reserva["reserva.Telefono"] } </td>
        <td className="text-center">
            { 
                (props.reserva.swstate==1?'':
                (props.reserva.swstate==2?
                    <>
                    <button 
                    className="btn btn-info mb-2 clBtnSmall" 
                    onClick={ 
                        () => 
                        { 
                            props.onActivaEstation(
                                props.reserva.codestacionamiento, 
                                3, 
                                ( (new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) == '1970-01-01 00:00:00') ? '' : new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) ) ) } }>< AiOutlineCheck /></button> 
                    <button className="btn btn-danger mb-2 clBtnSmall" onClick={ () => { props.onActivaEstation(props.reserva.codestacionamiento, 1, ( (new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) == '1970-01-01 00:00:00') ? '' : new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) ) ) } }>< AiOutlineClose /></button>
                    </>:
                (props.reserva.swstate==3?
                    <>
                    <button className="btn btn-success mb-2 clBtnSmall" onClick={ () => { props.onActivaEstation(props.reserva.codestacionamiento, 5, ( (new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) == '1970-01-01 00:00:00') ? '' : new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) )) } }>< AiOutlineDollar /></button>
                    </>:
                (props.reserva.swstate==4?'':(props.reserva.swstate==5?
                    <>
                    <button className="btn btn-warning mb-2 clBtnSmall" onClick={ () => { props.onActivaEstation(props.reserva.codestacionamiento, 1, ( (new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) == '1970-01-01 00:00:00') ? '' : new Date(props.reserva["reserva.ingreso"]).toISOString().replace('T', ' ').substring(0, 19) )) } }>< AiOutlineClose /></button>
                    </>
                    :''))))) 
            }
             
        </td>
    </tr>
}

export default TablaEstacionamientosFila;