import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { insertUser } from "../../Services/authService";
import { IRegisterUSer } from "../../types";


function RegisterUser() {

    const [state, setState] = useState("hidden");
    const [validated, setValidated] = useState(false);
    const [texto, setTexto] = useState("");

    function registerUser(e: any) {
        e.preventDefault();

        const nombre = e.target["txtNombre"].value;
        const apellidos = e.target["txtApellido"].value;
        const correo = e.target["txtCorreo"].value;
        const contrasena = e.target["txtPassword"].value;
        const celular = e.target["txtTelefono"].value;

        if (nombre == '' || apellidos == '' || correo == '' || contrasena == '' || celular == '') {
            setValidated(true);
        } else {

            validarCredenciales(nombre, apellidos, correo, contrasena, celular);
            setValidated(false);
        }

    }


    const validarCredenciales = async (nombre: string, apellidos: string, correo: string, contrasena: string, celular: number) => {

        const newUser: Partial<IRegisterUSer> = {}

        newUser.email = correo;
        newUser.names = nombre;
        newUser.surname = apellidos;
        newUser.phone = celular;
        newUser.password = contrasena;
        newUser.codprofile = 1;

        const res = await insertUser(newUser);
        // console.log(res);
        if (res.message.toUpperCase() == "OK") {
            // mostrar el login
            setState("alert alert-primary ErrorLogin");
        } else {
          setState("alert alert-danger ErrorLogin");
        }
        setTexto(res.data);
        
    }

    return <>
            <h2 className="mb-3">Registrate</h2>
            <Form noValidate  validated={validated} onSubmit={ registerUser }>
                  <Form.Group className="mb-3" controlId="formPlaca">
                      <Form.Label>Nombres:</Form.Label>
                          <Form.Control required type="text" placeholder="Nombres" name="txtNombre" />
                          <Form.Control.Feedback type="invalid">
                              Ingrese su nombre.
                          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formApellido">
                      <Form.Label>Apellidos:</Form.Label>
                          <Form.Control required type="text" placeholder="Apellidos" name="txtApellido" />
                          <Form.Control.Feedback type="invalid">
                              Ingrese su apellido.
                          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formUsuario">
                      <Form.Label>Correo:</Form.Label>
                          <Form.Control required type="email" placeholder="Correo" name="txtCorreo" />
                          <Form.Control.Feedback type="invalid">
                              Ingrese el correo.
                          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPlaca">
                      <Form.Label>Contraseña:</Form.Label>
                          <Form.Control required type="password" placeholder="Password" name="txtPassword" />
                          <Form.Control.Feedback type="invalid">
                              Ingrese Contraseña.
                          </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>N° Celular:</Form.Label>
                        <Form.Control required type="text" placeholder="Telefono" name="txtTelefono" />
                        <Form.Control.Feedback type="invalid">
                        Ingrese telefono.
                        </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPlaca">
                    <Button type="submit" variant="primary" > Registrar </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/autentication" >Iniciar Sesión</a>
                    <p >
                      <div className={ state } role="alert">
                        { texto }
                      </div>
                    </p>
                  </Form.Group>
            </Form>
    </>

}

export default RegisterUser;