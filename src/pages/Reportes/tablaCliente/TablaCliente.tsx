import { IReporteCliente, IReservaConfirma } from "../../../types";
import TablaClienteFila from "./TablaClienteFila";
import TablaClienteHeader from "./TablaClienteHeader"

interface IProps{
    data: IReporteCliente[];
}

function TablaCliente(props: IProps) {
    
    return <table className="table">
        <TablaClienteHeader />
        <tbody>
            {props.data.map((reservaIterador, index) => {
                return <TablaClienteFila reserva={ reservaIterador } i={ index } ></TablaClienteFila>
                }
            )}
        </tbody>
    </table>
}

export default TablaCliente;