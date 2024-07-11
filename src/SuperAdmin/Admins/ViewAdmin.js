import React, { useEffect, useState } from 'react';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { updateAdmin,getSingleAdmin } from '../../api/admin';
import { Link, useNavigate, useLocation } from "react-router-dom";



function AddAgent() {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const [admin, setAdmin] = useState('');




    useEffect(() => {
        
        getAllClientDetails();
      }, []);
    
      const  getAllClientDetails = () => { 
        getSingleAdmin(id)
          .then((res) => {
            console.log(res);
            setAdmin(res?.data?.result);
          
          })
          .catch((err) => {
            console.log(err);
          });
      };
    return (
        <div style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                   
                </nav>
               
               
         
            <div className="content-wrapper" style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="content-header ">
                <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h6 className='text-center text-capitalize p-1'>View Admin Details</h6>
                </div>
             
                
  
   
   
      <div class="card-body">
      <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
        <tbody >
          <tr >
            <td className='fw-bold'>Admin Name  </td>
            <td>Admin Name</td>
           
          </tr>
          <tr >
            <td className='fw-bold'>Role  </td>
            <td>Role</td>
          </tr>
          <tr >
            <td className='fw-bold'>Email  </td>
            <td>Email</td>
          </tr>
          <tr >
            <td className='fw-bold'>Contact Number  </td>
            <td>Contact number</td>
          </tr>
          <tr >
            <td className='fw-bold'>Password </td>
            <td>Password</td>
          </tr> <tr >
            <td className='fw-bold'>Confirm Password  </td>
            <td>Confirm Password</td>
          </tr>
        
        </tbody>
       </table>
      </div>
   
 

               
                 
                
                  
                
              </div>
            </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default AddAgent;
