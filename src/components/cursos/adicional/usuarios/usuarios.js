import React,{useState, useEffect,  useContext} from 'react';
//import AlertaContext from "../../../context/alerta/alertaContext";
//import CursosContext from "../../../context/cursos/cursosContext";

import Preloader from "../../curso/preloader";
import Modal from "../../../functions/function";
import CategoriaEditar from '../categoriaEditar';
import { useDispatch, useSelector } from "react-redux";
import {  obtenerRolesUsuario ,obtenerUsuariosRol} from "../../../../actions/adicionalActions";
import { UsuariosTable } from '../tabla/usuariosTable';
import PreLoader from '../../curso/preloader';
import EditorRolUsuario from './editarRolUsuario';
import { UsuariosTablePagination } from '../tabla/usuariosTablePagination';

const  Usuarios = (props) =>{   
  const dispatch = useDispatch();
  //const categorias = useSelector( state => state.adicional.categorias);
  const usuariosRoles = useSelector( state => state.adicional.usuariosRol);
  const roles = useSelector(state => state.adicional.roles)
  //const obtenerCategoriasDatos = e => dispatch( obtenerCategorias());
  const obtenerUsuariosRolDatos = e => dispatch(obtenerUsuariosRol());
  const obtenerRolesUsuarioDatos = e => dispatch(obtenerRolesUsuario(e));
  const [formInscribir,setFormInscribir] = useState(false);
  const [idLogin,setIdLogin] = useState(0);
  const [idRol,setIdRol] = useState(0);
  const [nombre,setNombre] = useState("");
           

    useEffect(() => {              
             obtenerUsuariosRolDatos();
             obtenerRolesUsuarioDatos();
    }, [])

    const btnFormInscribirCerrar = (e)=>{   
      setFormInscribir(false);
  }
  const btnEditarRol = (e)=>{   
    console.log(e);
    setIdLogin(e.idLogin);
    setIdRol(e.idrol);
    setNombre(e.nombre);

    setFormInscribir(true);
}

  if(usuariosRoles === null) return <PreLoader />
  if(roles === null) return <PreLoader />
  console.log(roles);
    return ( <div className="page-holder w-100 d-flex flex-wrap">
    <div className="container-fluid px-xl-5">
      <section className="pt-5">      
         
        <div className="row">
          <div className="col-lg-12 mb-0">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-lg-9"><h3 className="h6 text-uppercase mb-0">Secciones del usuarios</h3></div> 
                  <div className="col-lg-3"></div>
                </div>
              </div>
              <div className="card-body">
                <p></p>
              <div className="card2">
              <div className="card-body">
                

                <div className="row">
                  <div className="col-lg-12 mb-5">
                  
                  <div id="accordionTema">
                          
                      </div>
                      
                  </div>
                </div>                                                     
               
                <div className="row">
                <div className="col-lg-12 mb-5">
                                <UsuariosTablePagination usuariosRoles={usuariosRoles} btnEditarRol={btnEditarRol}/> 
            </div>
            </div>
                
            <div className="row">
                <div className="col-lg-12 mb-5">
                {formInscribir === true && 
                <EditorRolUsuario btnFormInscribirCerrar={btnFormInscribirCerrar} formInscribir={formInscribir} roles={roles} idLog={idLogin} idR={idRol} nombre={nombre}/>     }
                </div>
            </div>
                
              </div>
            </div>

    </div>
            </div>
          </div> 
          </div>

         

          
      </section>
      </div>
      </div> );
}
 
export default Usuarios