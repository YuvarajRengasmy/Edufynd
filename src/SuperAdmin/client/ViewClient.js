import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { updateClient,getSingleClient } from '../../api/client';
import {getallClientModule} from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";



function AddAgent() {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  
   
    const [client, setClient] = useState('')

   

   

    const navigate = useNavigate()
   
    useEffect(() => {
        getClientDetails();
  
      }, []);
    const getClientDetails = () => {
        getSingleClient(id)
          .then((res) => {
            setClient(res?.data?.result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

 

    return (
        <div  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    <nav className='navbar navbar-top navbar-expand'>
                    <Header />
                    </nav>
                  
                </nav>
           
            <div className="content-wrapper "  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="content-header ">
                    <div className="content container ">
                        <form >
                            <div className="row">

                            <div className="col-xl-12 ">
                    <div className="card rounded-2 border-0 ">
                      <div className="card-header justify-content-between d-sm-flex d-block " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                       Client Details :
                        </div>
                        
                      </div>
                      <div className="card-body">
                        <div className="row gy-4">

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Business Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                         
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                           
                                            value={client?.businessName}
                                            className="form-control "
                                            placeholder="Enter Business Name"

                                        />
                                       
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Type of client <span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                        <input
                                            className="form-control "
                                            value={client?.typeOfClient}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter businessMailID"
                                          
                                        /> 
                                           
                                           
                                       
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Business MailID<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control "
                                            value={client?.businessMailID}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter businessMailID"
                                          
                                        />
                                        
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            businessContactNo <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control "
                                            value={client?.businessContactNo}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Contact Number "
                                            name="businessContactNo"
                                           
                                        />
                                        
                                </div>

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            Website<span className="text-danger">*</span>
                                        </label>
                                        <input
                                          
                                            className="form-control "
                                            value={client?.website}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Website"
                                           
                                        />
                                        
                                    
                                </div>

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            Staff Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                           
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Name"
                                            value={client?.name}
                                           
                                        />
                                       
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Staff Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Contact Number"
                                            value={client?.contactNo}
                                           
                                        />
                                        
                                    
                                </div>


                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Staff EmailID<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            value={client?.emailID}
                                           
                                        />
                                        
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            AddressLine1?<span className="text-danger">*</span>
                                        </label>
                                        <input
                                        
                                            className="form-control "
                                            value={client?.addressLine1}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter No Area Street Name"
                                           
                                        />
                                       
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            AddressLine2<span className="text-danger">*</span>
                                        </label>
                                        <input  
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter City State"
                                            value={client?.addressLine2}  
                                        />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <label style={{ color: "#231F20" }}>
                                            AddressLine3<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            className="form-control "
                                            value={client?.addressLine3}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Country Pincode" 
                                           
                                        />  
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <label style={{ color: "#231F20" }}>
                                            Gstn<span className="text-danger">*</span>
                                        </label>
                                        <input    
                                            className="form-control"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            value={client?.gstn}
                                            placeholder="Enter Gstn"      
                                        />      
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <label style={{ color: "#231F20" }}>
                                            Status<span className="text-danger">*</span>
                                        </label>
                                        <input  
                                            className="form-control"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            value={client?.status}
                                               
                                        /> 
                                </div>
                              
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default AddAgent;
