import moment from "moment";
import { AiOutlineCheck, AiOutlineClose, AiOutlineDollar } from "react-icons/ai";
import { IReporteCliente, IReporteTarifa, IReservaConfirma } from "../../../types";

interface IProps{
    reserva: IReporteTarifa;
    i: Number;
}

function TablaTarifaFila(props: IProps) {

    return <tr>
        <td> { Number(props.i) + 1 } </td>
        <td> { props.reserva["detalle"] } </td>
        <td> S/. { props.reserva["precio"] } </td>
    </tr>
}

export default TablaTarifaFila;