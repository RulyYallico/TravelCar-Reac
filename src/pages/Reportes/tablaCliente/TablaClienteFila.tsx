import moment from "moment";
import { AiOutlineCheck, AiOutlineClose, AiOutlineDollar } from "react-icons/ai";
import { IReporteCliente, IReservaConfirma } from "../../../types";

interface IProps{
    reserva: IReporteCliente;
    i: Number;
}

function TablaClienteFila(props: IProps) {

    return <tr>
        <td> { Number(props.i) + 1 } </td>
        <td> { props.reserva["estacionamientos.locale.nomlocal"] } </td>
        <td> { props.reserva["estacionamientos.codestacionamiento"] } </td>
        <td> { props.reserva["placa"] } </td>
        <td> { (moment(props.reserva["ingreso"]).isValid() ? new Date(props.reserva["ingreso"]).toISOString().replace('T', ' ').substring(0, 19) : '') } </td>
        <td> { (moment(props.reserva["salida"]).isValid() ? new Date(props.reserva["salida"]).toISOString().replace('T', ' ').substring(0, 19) : '')  } </td>
        <td> S/. { props.reserva["costo"] } </td>
    </tr>
}

export default TablaClienteFila;