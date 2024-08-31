import React, { useEffect, useContext, useState }  from 'react';

import AuthContext  from "../context/authentication/authContext";
import CursosContext from "../context/cursos/cursosContext";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
function DashboardAdminP() {

  //info authentication
  const authContext  = useContext(AuthContext);
  const { usuarioAutenticado, usuarioLogin} = authContext;
  
  const cursosContext = useContext(CursosContext);
  const { slice, offset, perPage,
    pageCount, cursos, obtenerCursosUsuarioInstructor, setPageCount, setOffset, setSlice } = cursosContext;

   // const [slice, setSlice] = useState([]);
  //const [offset, setOffset] = useState(0);
  //const [data, setData] = useState([]);
  //const [perPage] = useState(5);
  //const [pageCount, setPageCount] = useState(0)
  
  

  /* const slice = data.slice(offset, offset + perPage)
  const postData = slice.map(pd => <div key={pd.id}>
                    <p>{pd.title}</p>
                    <img src={pd.thumbnailUrl} alt=""/>
                </div>)
  setData(postData)
  setPageCount(Math.ceil(data.length / perPage))
  */
  

  useEffect(() => {
    usuarioAutenticado();
    console.log("dashboardAdminP");
    if(cursos.length ===0)
      obtenerCursosUsuarioInstructor();
    setPageCount(Math.ceil(cursos.length / perPage));
    paginacionConfig();
  }, [offset]);
  
  const  paginacionConfig = () => {
    console.log(cursos);
    console.log(offset);
    console.log(perPage);
    // setSlice(cursos.slice(offset, offset + perPage)); 
    //(page_number - 1) * page_size, page_number * page_size
    //setSlice(cursos.slice( (offset -1) * perPage, offset * perPage));
    setSlice();
    
  }
  console.log(slice);
  
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};
  if(slice.length ===0) 
    return null;

  var cursosLista = [];
  console.log(slice);
  for(let i=0; i< slice.length;i++){
    console.log(i);
    cursosLista.push(
      <div className="d-flex justify-content-between align-items-start align-items-sm-center mb-4 flex-column flex-sm-row " key={i}>
        <div className="left d-flex align-items-center">
          {slice[i].estatus ==='Activo'? 
          (<div className="icon icon-lg shadow mr-3 text-blue" title={slice[i].estatus}><i className="far fa-check-circle"></i></div>)
          :
          <div className="icon icon-lg shadow mr-3 text-red" title={slice[i].estatus}><i className="fas fa-ban"></i></div>
          }
          
          <div className="text">
            <h6 className="mb-0 d-flex align-items-center"> <span>{slice[i].nombreCurso}</span><span className=" ml-2 "></span></h6><small className="text-gray">{slice[i].fechaRegistro}</small>
          </div>
        </div>
        <div className="right ml-5 ml-sm-0 pl-3 pl-sm-0 text-violet">                        
          <Link to={"/curso-editar/"+slice[i].idCurso}><button type="button" className="ml-2 btn btn-info">Editar</button></Link>
        </div>
      </div>
    )
  }
   
   

   

        
    return (  
      <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
      <section className="py-5">
            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-5 mb-lg-0">
                  <div className="card-header">
                    <h2 className="h6 mb-0 text-uppercase">Cursos como instructor</h2>
                  </div>
                  <div className="card-body">
                    <p className="text-gray mb-5">Listado de Cursos</p>
                              {cursosLista}
                    <div className="row h-100">
                      <div className="col-lg-12 my-auto">
                      <div className="card card-block ">
                              <ReactPaginate
                    previousLabel={"ant"}
                    nextLabel={"sig"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>                                
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="bg-white shadow roundy px-4 py-3 d-flex align-items-center justify-content-between mb-4">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <div className="dot mr-3 bg-violet"></div>
                    <div className="text">
                      <Link to="/curso-alta"><button type="button" className="ml-2 btn btn-info">Nuevo Curso</button></Link>
                    </div>
                  </div>
                  <div className="icon bg-blue text-white"><i className="fas fa-plus"></i></div>
                </div>
               
                <div className="bg-white shadow roundy px-4 py-3 d-flex align-items-center justify-content-between mb-4">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <div className="dot mr-3 bg-blue"></div>
                    <div className="text">
                    <Link to={"/adicional"}><button type="button" className="ml-2 btn btn-info">Adicional</button></Link>
                    </div>
                  </div>
                  <div className="icon bg-blue text-white"><i className="fas fa-pencil-alt"></i></div>
                </div>
                
              </div>
            
            </div>
          </section>  
          </div>                 
          </div>
     )
}

export default DashboardAdminP;


