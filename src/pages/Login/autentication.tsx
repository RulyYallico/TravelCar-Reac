import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { obtenerToken } from '../../Services/authService';

interface IAutentication{
    onAuthenticate: () => void;
}

function AutenticationUser(props: IAutentication) {

    const [state, setState] = useState("clHide");
    const [validated, setValidated] = useState(false);
    const [texto, setTexto] = useState("");

    const iniciarSesion = (e: any) => {
        e.preventDefault();

        const username = e.target["username"].value;
        const password = e.target["password"].value;

        if (username == '' || password == '') {
            setValidated(true);
        } else {
            validarCredenciales(username, password);
            setValidated(false);
        }

    }

    const validarCredenciales = async (email: string, password: string) => {

        const res = await obtenerToken(email, password);
            console.log(res);
            // console.log("nuevo token", res.data);
            if (res.message.toUpperCase() == "OK") {
  
            // escribir el token en el local storage
            if (res.data) {
                var NombresUser = res.nombre + " " + res.apellidos;
                localStorage.setItem("travelcar-token", res.data);
                localStorage.setItem("user-tc", String(res.idUser));
                localStorage.setItem("perfil-tc", String(res.idPerfil));
                localStorage.setItem("nombres-tc", String(NombresUser));
            }
            // mostrar el admin
            props.onAuthenticate();
            setState("clHide");
            setTexto("");
        } else {
          setState("clShow");
          setTexto(res.data);
        }
        
    }

    return <>
        <h2 className="mb-3">Iniciar Sesión</h2>
        {/*noValidate  validated={validated} onSubmit={ iniciarSesion } */}
              <Form noValidate  validated={validated} onSubmit={ iniciarSesion } >
                  <Form.Group className="mb-3" controlId="formPlaca">
                      <Form.Label>Usuario:</Form.Label>
                          <Form.Control required type="email" placeholder="username" name="username" />
                          <Form.Control.Feedback type="invalid">
                              Por favor, Ingrese el usuario.
                          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPlaca">
                      <Form.Label>Contraseña:</Form.Label>
                          <Form.Control required type="password" placeholder="password" name="password" />
                          <Form.Control.Feedback type="invalid">
                              Por favor, Ingrese la contraseña.
                          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPlaca">
                    <Button type="submit" variant="primary" > Iniciar prueba </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/register" >Registrate</a>
                    <p className={ state }>
                      <div className="alert alert-danger ErrorLogin" role="alert">
                        { texto }
                      </div>
                    </p>
                  </Form.Group>
              </Form>
    </>
}


export default AutenticationUser;