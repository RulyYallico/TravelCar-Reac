import { IEstacionamiento, IReservaConfirma } from "../../../types";

interface IProps{
    data: IEstacionamiento;
    index: Number;
    onActivaEstation: (idEstacion: Number, idTipo: Number) => void;
}

function TablaConfigFila(props: IProps){

    return <tr >
        <td>{ Number(props.index) + 1 }</td>
        <td> { props.data.codestacionamiento } </td>
        <td> { props.data.orden } </td>
        <td> { props.data.sector } </td>
        <td> { (props.data.swstate == 4?'INACTIVO':'ACTIVO') } </td>
        <td> { ( props.data.swstate == 4 ? 
            <button className="btn btn-success mb-2 clBtnSmall" onClick = { () => { props.onActivaEstation(props.data.codestacionamiento, props.data.swstate) } }  key={ props.index.toString() } > Activar </button>
            : 
            <button className="btn btn-danger mb-2 clBtnSmall" onClick = { () => { props.onActivaEstation(props.data.codestacionamiento, props.data.swstate) } }  key={ props.index.toString() } > Desactivar </button> ) } </td>
    </tr>
}

export default TablaConfigFila;
