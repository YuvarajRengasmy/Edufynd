import React from 'react'
import Sidebar from "../../compoents/sidebar";

export const ViewBlog  = () => {
  return (
    <>  <div  style={{fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
    <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
            
          
        </nav>
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
            <div className="container-fluid">
                
                   

                  
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'>View Blog Details</h5>
        </div>
              <div className="card-body">
              <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
<tbody >
  <tr>
    <td>Title </td>
    <td>Title</td>
  </tr>
  <tr>
    <td>Introduction </td>
    <td>Introduction</td>
  </tr>
  <tr>
    <td>Content1</td>
    <td>Content1</td>
  </tr>
  <tr>
    <td>Content2</td>
    <td>Content2</td>
  </tr>
  <tr>
    <td>Content3</td>
    <td>Content3</td>
  </tr>
  <tr>
    <td>Tags</td>
    <td>Tags</td>
  </tr>
 
</tbody>
</table>
                    </div>
                    </div>
                  
                    
               
            </div>
        </div>
    </div>
    </div>
</div></>
  )
}
export default ViewBlog