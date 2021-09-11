import { DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
import { IDropBox } from '../types';

interface IDatos{
    datos: IDropBox[];
    color: String;
    onBtnClick: (e: any) => void;
}

// props: IDropBox    props: IDatos
function DropBox(props: IDatos){

    return <>
      <DropdownButton as={ButtonGroup}
        key="primary"
        id={`dropdown-variants-${props.color}`}
        // variant={variant.toLowerCase()}
        title='Seleccione una opción'
        >
            { props.datos.map(locales => (
                <Dropdown.Item key={ locales.codlocal.toString() } className="liLocal" id={locales.codlocal.toString()} eventKey={locales.codlocal.toString()} onClick={ props.onBtnClick } >{locales.nomlocal}</Dropdown.Item>
            )) }

      </DropdownButton>
    </>
}


export default DropBox;