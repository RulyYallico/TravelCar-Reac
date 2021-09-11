import { DropdownButton, Dropdown, ButtonGroup, FormGroup, Form} from 'react-bootstrap';
import { ITarifa } from '../../types';

interface IDatos{
    datos: ITarifa[];
    color: String;
    texto: String;
    tipo: Number;
    onBtnClick: (e: any) => void;
}

function LlenaTarifa(props: IDatos) {

    return <>
        { (props.tipo==1)?
        
            <Form.Select className="form-select" id="cmbDias" onChange={ props.onBtnClick } >
                <option value="0"> { props.texto } </option>
                {
                    props.datos.map(tarifas => (
                        tarifas.tipo == "DIA" ? 
                            <option 
                                key={ tarifas.codtarifarios.toString() } 
                                className="liLocal" 
                                onClick={ props.onBtnClick } 
                                value={ tarifas.precio }
                            >{tarifas.detalle}</option>
                        : 
                            ''
                    )) 
                }
            </Form.Select>

        :
            
            <Form.Select className="form-select" id="cmbHoras" onChange={ props.onBtnClick } >
                <option value="0"> { props.texto } </option>
                {
                    props.datos.map(tarifas => ( 
                        tarifas.tipo == "HORA" ? 
                            <option 
                                key={ tarifas.codtarifarios.toString() } 
                                className="liLocal" 
                                value={ tarifas.precio } 
                                onClick={ props.onBtnClick } 
                            >{tarifas.detalle}</option> 
                        : 
                            '' 
                    )) 
                }
            </Form.Select>

        }
        
       
    </>
}

export default LlenaTarifa;


/*

 <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
            Seleccione opción
        </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    props.datos.map(tarifas => (
                        <Dropdown.Item key={ tarifas.codtarifarios.toString() } className="liLocal" id={tarifas.codtarifarios.toString()} eventKey={tarifas.codtarifarios.toString()} onClick={ props.onBtnClick } >{tarifas.detalle}</Dropdown.Item>
                    )) 
                }
            </Dropdown.Menu>
        </Dropdown>

*/
