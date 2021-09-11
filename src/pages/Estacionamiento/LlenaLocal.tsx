import { Form } from "react-bootstrap";
import { IDropBox, ILocales } from "../../types";

interface IProps{
    data: IDropBox[];
    onBtnClick: (e: any) => void;
}

function LlenaLocal(props: IProps) {

    // console.log(props.data);

    return <>
        <Form.Select className="form-select" id="cmbDias" onChange={ props.onBtnClick } >
            <option value="0" id="0" key="0" >Seleccione</option>
            {
                props.data.map(local => (
                    <option key={ Number(local.codlocal) } id={ local.codlocal.toString() } value={ Number(local.codlocal) }> { local.nomlocal } </option>
                ) )
            }
        </Form.Select>
    </>
}

export default LlenaLocal;
