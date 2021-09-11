import { IReservaConfirma } from "../../../types";
import TablaEstacionamientosFila from "./TablaEstacionamientosFila";
import TablaEstacionamientosHEader from "./TablaEstacionamientosHEader";

interface IProps{
    data: IReservaConfirma[];
    onActivaEstations: (estacioId: Number, idTipo: Number, fInicio: String) => Promise<void>;
}

function TablaEstacionamientos(props: IProps) {
    
    return <table className="table table-striped table-hover">
        <TablaEstacionamientosHEader></TablaEstacionamientosHEader>
        <tbody>
            {props.data.map((reservaIterador) => {
                return <TablaEstacionamientosFila reserva={ reservaIterador } onActivaEstation={ props.onActivaEstations }></TablaEstacionamientosFila>
                }
            )}
        </tbody>
    </table>
}

export default TablaEstacionamientos;