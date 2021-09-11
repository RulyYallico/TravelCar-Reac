import { useEffect, useState } from 'react';
import imgBG5 from '../../assets/img/bg5.jpg';
import Mike from '../../assets/img/mike.jpg';
import { obtenerDatosUser, updateUsers } from '../../Services/authService';
import { IRegisterUSer, IUsers } from '../../types';

function DatosPersonales() {

  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState<IUsers>();

  const idUser = Number(localStorage.getItem("user-tc"));
  useEffect( () => {
    async function cargaDatosPersonales() {
      var datosUser = await obtenerDatosUser(idUser);
      setIsLoad(true);
      console.log(datosUser);
      setData(datosUser);
    }

    setTimeout(() => {
      cargaDatosPersonales();
    }, 500)
  }, []);


  function changeUser(e: any) {
    e.preventDefault();
    let el = e.target;

    const nombre = e.target["txtNombre"].value;
    const apellidos = e.target["txtApellido"].value;
    const correo = e.target["txtCorreo"].value;
    const address = e.target["txtAddress"].value;
    const celular = e.target["txtTelefono"].value;
    const nickname = e.target["txtNickName"].value;


    saveUser(nickname, correo, nombre, apellidos, celular, address);

    console.log(el);
  }


  const saveUser = async (nickname: String, correo: String, nombre: String, apellidos: String, celular: Number, address: String) => {

    const idUser = localStorage.getItem("user-tc");

    const updateUser: Partial<IRegisterUSer> = {};

    updateUser.nickname = nickname;
    updateUser.email = correo;
    updateUser.names = nombre;
    updateUser.surname = apellidos;
    updateUser.phone = celular;
    updateUser.address = address;
    updateUser.codUser = Number(idUser);

    const res = await updateUsers(updateUser, Number(idUser));

    console.log(res);
    if (res.message.toUpperCase() == "OK") {
      // mostrar el login
      console.log("ok");
  } else {
      console.log("no ok");
  }

  }



  if(!isLoad){
    return <div><br /><h3>Cargando...</h3></div>;
  } else {
    return <>
        <div className="content">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="title">Editar mi Perfil</h5>
              </div>
              <div className="card-body">
                <form onSubmit={ changeUser }>
                  <div className="row">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Empresa (disabled)</label>
                        <input disabled={true} type="text" className="form-control" placeholder="Company" value="Travel CAR" />
                      </div>
                    </div>
                    <div className="col-md-3 px-1">
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" id="txtNickName" value= { data?.nick_name } />
                      </div>
                    </div>
                    <div className="col-md-4 pl-1">
                      <div className="form-group">
                        <label >Correo Electronico</label>
                        <input type="email" className="form-control" placeholder="Email" id="txtCorreo" value={ data?.email } />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                        <label>Nombres</label>
                        <input type="text" className="form-control" placeholder="Company" id="txtNombre" value={ data?.names } />
                      </div>
                    </div>
                    <div className="col-md-4 pl-1">
                      <div className="form-group">
                        <label>Apellidos</label>
                        <input type="text" className="form-control" placeholder="Last Name" id="txtApellido" value={ data?.surname } />
                      </div>
                    </div>
                    <div className="col-md-4 pl-1">
                      <div className="form-group">
                        <label>Celular</label>
                        <input type="text" className="form-control" placeholder="Celular" id="txtTelefono" value={ data?.phone } />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Dirección</label>
                        <input type="text" className="form-control" placeholder="Home Address" id="txtAddress" value={ data?.address }/>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                        <label>Ciudad</label>
                        <input type="text" className="form-control" placeholder="City" value="Huancayo" />
                      </div>
                    </div>
                    <div className="col-md-4 px-1">
                      <div className="form-group">
                        <label>Pais</label>
                        <input type="text" className="form-control" placeholder="Country" value="Perú" />
                      </div>
                    </div>
                  </div> */}
                  <hr />
                  <div className="row">
                      <div className="col-md-12 text-center">
                        <button className="btn btn-primary">Guardar</button>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-user">
              <div className="image">
                <img src={ imgBG5 } alt="..." />
              </div>
              <div className="card-body">
                <div className="author">
                  <a href="#">
                    <img className="avatar border-gray" src={ Mike } alt="..." />
                    <h5 className="title"> { data?.names } { data?.surname } </h5>
                  </a>
                  <p className="description">
                  { data?.nick_name }
                  </p>
                </div>
                <p className="description text-center">
                    { data?.address }
                </p>
              </div>
              <hr />
              <div className="button-container">
                <button className="btn btn-neutral btn-icon btn-round btn-lg">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button  className="btn btn-neutral btn-icon btn-round btn-lg">
                  <i className="fab fa-twitter"></i>
                </button>
                <button  className="btn btn-neutral btn-icon btn-round btn-lg">
                  <i className="fab fa-google-plus-g"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  }
}

export default DatosPersonales;
