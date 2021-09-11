import { useEffect } from "react";
import { useState } from "react";
import DropBox from "../../components/dropbox";
import { GetTarifasDia, GetTarifasHoras, obtenerLocales } from "../../Services/authService";
import { IDropBox, IReporteTarifa } from "../../types";
import TablaTarifa from "./tablaTarifa/TablaTarifa";


function ReporteTarifa() {

    const [tarifad, setTarifad] = useState<IReporteTarifa[]>([]);
    const [tarifah, setTarifah] = useState<IReporteTarifa[]>([]);
    const [locales, setLocales] = useState<IDropBox[]>([]);

    useEffect(() => {
        async function cargaLocales() {
            var misLocales = await obtenerLocales();
            setLocales(misLocales);
        }

        setTimeout(() => {
            cargaLocales();
        }, 500)
    }, []);

    function validaClick( e: any ) {
        e.preventDefault();
        const el = e.target;

        var elemento = document.querySelectorAll(".liLocal");
        for (var i = 0; i < elemento.length; i++) {
            elemento[i].classList.remove('active');
        }
        el.classList.add('active');

        const idLocal = el.getAttribute('id');
        // setslocal(idLocal);
        ListaTarifas(idLocal);
        // listaTarifa(idLocal);

    }

    const ListaTarifas = async (idLocal: Number) => {
        const resD = await GetTarifasDia(idLocal);
        const resH = await GetTarifasHoras(idLocal);
        console.log(resD);
        console.log(resH);
        setTarifad(resD);
        setTarifah(resH);
        
    }


    return <>
        <div className="content">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title"> Reporte Tarifas </h4>
                        </div>
                    </div>
                    <DropBox datos={ locales } color="primary" onBtnClick={ validaClick }></DropBox>
                    <br />
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-6">
                                <h4>Costo por día</h4>
                                <TablaTarifa data={ tarifad } ></TablaTarifa>
                            </div>
                            <div className="col-sm-6">
                                <h4>Costo por hora</h4>
                                <TablaTarifa data={ tarifah } ></TablaTarifa>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default ReporteTarifa;