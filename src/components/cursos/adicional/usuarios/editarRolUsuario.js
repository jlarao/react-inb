import React, {useState,  useEffect} from 'react';
import {  editarRolUsuarioAction, limpiarMensajeAdicional } from "../../../../actions/adicionalActions";
import Modal from "../../../functions/function";
import { useDispatch, useSelector } from "react-redux";
const EditorRolUsuario = ({btnFormInscribirCerrar, formInscribir,  roles, idLog, idR, nombre}) => {
  const dispatch = useDispatch();
  const editarRolUsuario = e => dispatch( editarRolUsuarioAction(e));
  const limpiarMensaje = e => dispatch(limpiarMensajeAdicional());
  const mensaje = useSelector( state => state.adicional.mensaje);

    const [datos, setDatos] = useState({                
      idLogin: idLog,
      idRol: idR,
      nombreRol: nombre.nombreRol,      
      error: false,
      errorMsg: ""       
    });

   
    const {idRol}  =datos;

    const   manejadorSubmit = e =>{    
        e.preventDefault();    
        if(datos.idRol!=="0"){                             
              if(datos.idLogin!=="0"){
                console.log("guardando");
                setDatos({
                  ...datos,
                      error: false,
                      errorMsg: ""
                    })
                editarRolUsuario(datos);
              }else{
                setDatos({
                  ...datos,
                      error: true,
                      errorMsg: " usuario invalido"
                    })  
              }
              
        }else{
          setDatos({
            ...datos,
                error: true,
                errorMsg: " Favor de seleccionar un rol"
              })
              console.log("verda");
        }        
      }

      const  manejadorChange =  e => { 
        ////console.log(e.target.options.selectedIndex);
        //console.log(e.target.options);
        //console.log(e.target.options[e.target.options.selectedIndex].innerText);
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
            'nombreRol': e.target.options[e.target.options.selectedIndex].innerText                
              })
/*
        setDatos({
          ...datos,
          'nombreRol': e.target.options[e.target.options.selectedIndex].innerText
          })*/
              console.log(datos);
        }        
    if(formInscribir===false)   return null;
    return ( 
        <div className="card2">
        <div className="card-body">
        <form className="form-horizontal" onSubmit={manejadorSubmit} >
                <div className="row">
                  <div className="col-lg-12 mb-5">
                  <div className="form-group row">
                          <h3 className="col-md-12 form-control-label">Ediatr rol de usuario: <span className="text-primary">{nombre.nombre} {nombre.apellidoPaterno}</span></h3>
                          
                  </div>

                  <div className="form-group row">
                          <label className="col-md-3 form-control-label">Rol</label>
                          <div className="col-md-9 select mb-3">
                            <select name="idRol" className="form-control" onChange={manejadorChange} value={idRol}>
                              <option value="0">Seleccione una opción</option>
                              {roles.map(c=>(
                              <option key={c.idRol} value={c.idRol}>{c.nombreRol}</option>))
                          }
                            </select>
                          </div>                      
                        </div>
                   
                  

                  <div className="form-group row">
                          <div className="col-md-9 ml-auto">
                            <input type="submit" value="Guardar" className="btn btn-primary" />
                            <button type="button" className="btn btn-danger ml-1" onClick={ ()=> {btnFormInscribirCerrar(false)} }>Cerrar</button>
                          </div>
                        </div>  
                  </div>
                  </div>
                  {datos.error === true &&
             <div className="alert alert-danger" role="alert">
               {datos.errorMsg}
             </div>
           }
                  </form>
                  
             </div></div>  
     );
}
 
export default EditorRolUsuario;