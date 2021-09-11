import { IEstacionamiento } from "../../types";

interface IEstation{
    data: IEstacionamiento[];
    onBtnClick: (e: any) => void;
}

/*
1 = libre
2 = proceso de reserva
3 = reservado
4 = inactivo
*/

function LlenaEstacionamiento(props: IEstation) {

    return <>
            {
                props.data.map(result => (
                    <div itemID={result.codestacionamiento.toString()} id={result.codestacionamiento.toString()} key={ result.codestacionamiento.toString() } className="col-sm-6 col-md-6 clEstacionameinto">
                        { 
                            <div itemID={result.swstate.toString()} id={result.codestacionamiento.toString()} key={ result.codestacionamiento.toString() } className={"estaVehi "+ (result.swstate==1?'libre':(result.swstate==2?'procesoreserva':(result.swstate==3?'ocupado':(result.swstate==4?'inactivo':(result.swstate==5?'pagado':''))))) } onClick={ props.onBtnClick } >
                                <div itemID={result.swstate.toString()} id={result.codestacionamiento.toString()} key={ result.codestacionamiento.toString() } className="text-state">{ result.codestacionamiento } { (result.swstate==1?'LIBRE':(result.swstate==2?'EN PROCESO DE RESERVA':(result.swstate==3?'OCUPADO':(result.swstate==4?'INACTIVO':(result.swstate==5?'PAGADO':''))))) }</div>
                            </div>
                        }
                    </div>
                    
                ))
            }

    </>
}

export default LlenaEstacionamiento;