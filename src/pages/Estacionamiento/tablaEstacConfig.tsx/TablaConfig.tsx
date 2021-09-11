import { IEstacionamiento, IReservaConfirma } from "../../../types";
import TablaConfigFila from "./TablaConfigFila";

interface IProps{
    data: IEstacionamiento[];
    onActivaEstations: (estacioId: Number, idTipo: Number) => Promise<void>;
}

function TablaEstacConfig(props: IProps) {

    return <table className="table table-striped table-hover">
        <thead className="table-dark">
            <tr>
                <th>N°</th>
                <th>Código</th>
                <th>Orden</th>
                <th>Sector</th>
                <th>Estado</th>
                <th>Opción</th>
            </tr>
        </thead>
        <tbody>
            {
                props.data.map((estacion, index) => (
                    <TablaConfigFila data = { estacion } index={ index } onActivaEstation={ props.onActivaEstations }></TablaConfigFila>
                ))
            }
        </tbody>
    </table>

}

export default TablaEstacConfig;