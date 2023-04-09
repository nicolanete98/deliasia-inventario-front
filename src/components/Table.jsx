import React from 'react'

export const Table =  ({data,eliminar,_function}) => {

       

  return (
    <div className='h-100 overflow-scroll' style={{maxHeight: 400, minHeight: 400}}>
        <table className="table fs-5">
            <thead>
                <tr> 
                    {(eliminar)?  <th> eliminar</th> : ''}
                    { (data.length != 0 )? Object.keys(data[0]).map(element => {
                        return <th scope='col' key={element}>{element}</th>                    
                        }): <></>
                    }
                </tr>
            </thead>
            <tbody>
                
                {data.map((element,index )=> { 
                    return <tr key={index}>
                            { (eliminar)? <td>
                                <button className='btn btn-danger' onClick={(e) => _function(index)}>X</button>
                            </td>: ''}
                            {
                                Object.keys(element).map((info,index) =>{
                                    return <td key={index}>{element[info]}</td>
                            })}</tr>;
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
