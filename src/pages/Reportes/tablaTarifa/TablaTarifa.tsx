import { IReporteCliente, IReporteTarifa, IReservaConfirma } from "../../../types";
import TablaTarifaFila from "./TablaTarifaFila";
import TablaTarifaHeader from "./TablaTarifaHeader";

interface IProps{
    data: IReporteTarifa[];
}

function TablaTarifa(props: IProps) {
    

    return <table className="table">
        <TablaTarifaHeader />
        <tbody>
            {props.data.map((reservaIterador, index) => {
                return <TablaTarifaFila reserva={ reservaIterador } i={ index } ></TablaTarifaFila>
                }
            )}
        </tbody>
    </table>
}

export default TablaTarifa;