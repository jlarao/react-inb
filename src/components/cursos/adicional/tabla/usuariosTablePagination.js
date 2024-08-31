import React, { useMemo, useEffect } from 'react'
import { useTable, usePagination} from "react-table";
//import MOCK_DATA from "../../../MOCK_DATA.json";
import { COLUMNS } from "./columnsUsuarios";
import { Link  } from "react-router-dom";
import  "./table.css";
import { useDispatch, useSelector } from "react-redux";
import {  activarUsuariosRol, eliminarUsuariosRol ,limpiarMensajeAdicional} from "../../../../actions/adicionalActions";
import Modal from "../../../functions/function";

export const UsuariosTablePagination = ({usuariosRoles, btnEditarRol}) => {
    const dispatch = useDispatch();  
  const eliminarUsuarios = e => dispatch( eliminarUsuariosRol(e));
  const activarUsuarios = e => dispatch(activarUsuariosRol(e));
  const mensaje = useSelector( state => state.adicional.mensaje);
  const limpiarMensaje = e => dispatch(limpiarMensajeAdicional());
    //const columns = useMemo( ()=> COLUMNS, [] );
    //const data = useMemo( ()=> MOCK_DATA, [] )

    useEffect(() => {
        
       
        if(mensaje){
          //mostrarAlerta(mensaje.msg, mensaje.categoria);
          console.log(mensaje);
          tratarMensajes(mensaje);                    
        }
        //obtenerCategoriasDatos();
        
    }, [mensaje])

    const tratarMensajes=()=>{
      Modal.Toast.show({html: mensaje.msg, mensaje: mensaje});
      setTimeout( ()=>{ limpiarMensaje() } ,5000 );
    }

    const columns = React.useMemo(
        () => [
        {
            Header: 'Id',
            accessor: 'idUsuario'               
        },{
            Header: 'nombre',
            accessor: 'nombre',
        },{
            Header: 'apellido',
            accessor: 'apellidoPaterno',
        },{
            Header: 'Rol',
            accessor: 'nombreRol',
            Cell:  ({row}) =>{
                //console.log(props)
                return row.original.nombreRol
                
            }
        },
        {
            Header: 'estatus',
            accessor: 'estatusLogin',
            Cell:  ({row}) =>{
                //console.log(props)
                return row.original.estatusLogin ==='Activo'? 
                (<div className="icon icon-lg shadow mr-3 text-green" title={row.original.estatusLogin}><i className="far fa-check-circle"></i></div>)
                :
                (<div className="icon icon-lg shadow mr-3 text-red" title={row.original.estatusLogin}><i className="fas fa-ban"></i></div>)
                
            }
        },
        
        {
            Header: 'Opciones',        
        //    Cell: ({ cell: { value }, row: { original } }) => <Link to={`users/${original.idUsuario}`} className="btn btn-primary"><i className="fa fa-eye">{value}</i></Link>
            Cell: ({row}) => {
                //console.log(row);
                const obj = {
                    idLogin: row.original.idLogin,
                    idrol:  row.original.idRol,
                    nombre: row.original
                } 
                return (
                <div>
                    <Link to={`usuariosCursos/${row.original.idUsuario}`} className="btn btn-primary"><i className="fa fa-eye"></i></Link>
                    { row.original.estatusLogin==='Activo'? (<button onClick={()=>suspenderUsuario(`${row.original.idLogin}`)}  className="btn btn-danger ml-2" title="Suspender usuario"><i className="fa fa-user-lock ml-auto"></i></button>): (<button onClick={()=>activarUsuario(`${row.original.idLogin}`)}  className="btn btn-success ml-2" title="Activar Usuario"><i className="fa fa-user ml-auto"></i></button>)}
                    <button onClick={()=>btnEditarRol(obj)}  className="btn btn-info ml-2" title="modificar Rol"><i className="fa fa-user-cog ml-auto"></i></button> 
                </div> 
                )
            }
        }
    ],
    []
  )
    const tableInstance = useTable({
        columns,
        data: usuariosRoles
    },
    usePagination)
    const suspenderUsuario= (e) =>{
        eliminarUsuarios(e);
        console.log(e);
    }
    const activarUsuario= (e) =>{
        activarUsuarios(e);
        console.log(e);
    }
    
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow } = tableInstance;

        const { pageIndex, pageSize } = state;
    return (
        <>
        <table {...getTableProps()}>
           <thead>
           {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                   {
                    headerGroup.headers.map( (column) => (
                        <th {...column.getHeaderProps() }>{column.render('Header')}</th>
                    ))
                   }
                    
                </tr>
           ))}
               
            </thead>

           <tbody {...getTableBodyProps()}>
               {
                    page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {
                            row.cells.map( (cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>                                
                            })
                        }                            
                        </tr>
                    )   
                   })}
               
           </tbody>
        </table>
        <div>
            <span>
                Pagina{' '}
                <strong>{pageIndex+1} de {pageOptions.length}</strong>{' '}
            </span>
            <span>Ir a la página: {' '}
                <input type="number" defaultValue={pageIndex+1} onChange={ e => { 
                    const pageNumber = e.target.value ? Number(e.target.value -1) : 0
                    gotoPage(pageNumber)
                 }} style = {{ width : '50px' }}/>
            </span>
            <select value={pageSize} onChange = { (e) => setPageSize(Number(e.target.value)) } >
                 {
                     [5,10,20].map( pageSize => (
                         <option key={pageSize} value={pageSize}>
                             mostrar {pageSize}
                         </option>
                     ))
                 }
            </select>
            <button onClick={ ()=> gotoPage(0) } disabled={ !canPreviousPage} >{'<<'}</button>
            <button onClick={ ()=>{previousPage()}  } disabled={!canPreviousPage}>
                Anterior
                </button>
            <button onClick={ ()=>{nextPage() }} disabled={!canNextPage}>
                Siguiente
                </button>
            <button onClick={ ()=> gotoPage(pageCount-1) } disabled= { !canNextPage} >{'>>'}</button>
        </div>
        </>
    )
}
