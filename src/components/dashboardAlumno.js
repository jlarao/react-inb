import React, { useEffect, useContext }  from 'react';
import {useDispatch, useSelector} from "redux";
import { obtenerCursosUsuarioAlumno } from "../actions/cursoReproductorActions";

import AuthContext  from "../context/authentication/authContext";
import CursosContext from "../context/cursos/cursosContext";
import { Link } from "react-router-dom";
import Modal from "./functions/function";
import Preloader from "./cursos/curso/preloader";
function DashboardAlumno() {

  //info authentication
  const authContext  = useContext(AuthContext);
  const { autenticado, usuarioAutenticado} = authContext;
  
  const cursosContext = useContext(CursosContext);
  const { mensaje, cursos, obtenerCursosUsuarioAlumno , limpiarMensaje} = cursosContext;

  /*if(!autenticado){
    return (
        <Preloader />
    );
    }*/

  useEffect(() => {
    console.log(autenticado);
    if(!autenticado){
      usuarioAutenticado();      
    }
      
    
    
    console.log("dashboard");
    
    if(mensaje){
      //mostrarAlerta(mensaje.msg, mensaje.categoria);
      console.log(mensaje);
      tratarMensajes(mensaje)
      
    }else{
      obtenerCursosUsuarioAlumno();
    }
  }, [mensaje]);

  const tratarMensajes=()=>{
    Modal.Toast.show({html: mensaje.msg, mensaje: mensaje});
    //setTimeout( ()=>{ limpiarMensaje() } ,5000 );
  }
  var cursosLista = [];
  for(let i=0; i< cursos.length;i++){
    console.log(i);
    cursosLista.push(
      <div className="d-flex justify-content-between align-items-start align-items-sm-center mb-4 flex-column flex-sm-row " key={i}>
        <div className="left d-flex align-items-center">
          <div className="icon icon-lg shadow mr-3 text-gray"><i className="fab fa-dropbox"></i></div>
          <div className="text">
            <h6 className="mb-0 d-flex align-items-center"> <span>{cursos[i].nombreCurso}</span><span className=" ml-2 "></span></h6><small className="text-gray">{cursos[i].fechaRegistro}</small>
          </div>
        </div>
        <div className="right ml-5 ml-sm-0 pl-3 pl-sm-0 text-violet">                        
          <Link to={"/curso-tomar/"+cursos[i].idCurso}><button type="button" className="ml-2 btn btn-info">Ver Curso</button></Link>
        </div>
      </div>
    )
  }
   
    const manejadorSubmit = e =>{

    }

    const manejadorChange = e =>{

    }

    const manejadorBoton = e =>{

    }

   

        
    return (  
      <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
      <section className="py-5">
            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-5 mb-lg-0">
                  <div className="card-header">
                    <h2 className="h6 mb-0 text-uppercase">Cursos comprados</h2>
                  </div>
                  <div className="card-body">
                    <p className="text-gray mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              {cursosLista}                                
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="bg-white shadow roundy px-4 py-3 d-flex align-items-center justify-content-between mb-4">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <div className="dot mr-3 bg-violet"></div>
                    <div className="text">
                      
                    </div>
                  </div>
                  <div className="icon bg-violet text-white"><i className="fas fa-clipboard-check"></i></div>
                </div>
                <div className="bg-white shadow roundy px-4 py-3 d-flex align-items-center justify-content-between mb-4">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <div className="dot mr-3 bg-green"></div>
                    <div className="text">
                      <h6 className="mb-0">New Quotes</h6><span className="text-gray">214 new quotes</span>
                    </div>
                  </div>
                  <div className="icon bg-green text-white"><i className="fas fa-dollar-sign"></i></div>
                </div>
                <div className="bg-white shadow roundy px-4 py-3 d-flex align-items-center justify-content-between mb-4">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <div className="dot mr-3 bg-blue"></div>
                    <div className="text">
                      <h6 className="mb-0">New clients</h6><span className="text-gray">25 new clients</span>
                    </div>
                  </div>
                  <div className="icon bg-blue text-white"><i className="fas fa-user-friends"></i></div>
                </div>
                
              </div>
            
            </div>
          </section>  
          </div>                 
          </div>
     )
}

export default DashboardAlumno;


