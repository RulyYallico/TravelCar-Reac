import { useEffect, useState } from "react";
import { GetRerporteCliente } from "../../Services/estacionamiento.service";
import { IReporteCliente } from "../../types";
import TablaCliente from "./tablaCliente/TablaCliente";

function ReporteCliente() {


  const [reserva, setReserva] = useState<IReporteCliente[]>([]);
  
  function clickReporte ( e: any) {
    e.preventDefault();
    const ini = e.target["txtFini"].value;
    const fin = e.target["txtFfin"].value;
    // console.log(ini, fin);
    llenaReporte(ini, fin);
  }

  const llenaReporte = async (ini: Date, fin: Date) => {
    let codUser = Number(localStorage.getItem("user-tc"));

    const result = await GetRerporteCliente(codUser, ini, fin);
    setReserva(result);
  }

    return <>
        <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Reporte por Fechas</h4>
              </div>
              <div>
                <form onSubmit={ clickReporte }>
                  <label htmlFor="txtFini">Inicio: </label>
                  <input type="date" id="txtFini" className="inputReporte"></input>
                  &nbsp;&nbsp;&nbsp;
                  <label htmlFor="txtFfin">Fin: </label>
                  <input type="date" id="txtFfin" className="inputReporte"></input>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-primary btnReporte" >Buscar</button>
                </form>
              </div>
              <hr />
              <div className="card-body">
                <div className="table-responsive">
                  <TablaCliente data={ reserva }></TablaCliente>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>

}

export default ReporteCliente;