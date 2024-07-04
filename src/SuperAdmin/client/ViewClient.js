import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { updateClient,getSingleClient } from '../../api/client';
import {getallClientModule} from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";



function AddAgent() {

    

 

    return (
        <div  style={{fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    <nav className='navbar navbar-top navbar-expand'>
                    <Header />
                    </nav>
                  
                </nav>
           
            <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="content-header ">
                    <div className=" container-fluid">
                        
                            <div className="row">

                            <div className="col-xl-12 ">
                    <div className="card rounded-0 p-4 border-0 ">
                      <div className="card-header p-2 rounded-0  text-center  " style={{ backgroundColor: '#fe5722',color:'#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <h3 className='text-center'> View  Client Details </h3>
                    
                        
                      </div>
                      <div className="card-body">
                      <table class="table table-bordered table-hover">
        <tbody >
          <tr>
            <td>Client ID </td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td>Type of client </td>
            <td>+1234567890</td>
          </tr>
          <tr>
            <td>Business Name</td>
            <td>+0987654321</td>
          </tr>
          <tr>
            <td>Business Mail ID</td>
            <td>john.doe@example.com</td>
          </tr>
          <tr>
            <td>Business Contact No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>$50,000</td>
          </tr>
          <tr>
            <td>Staff Name</td>
            <td>$3,000</td>
          </tr>
          <tr>
            <td>Staff Contact No</td>
            <td>A12345678</td>
          </tr>
          <tr>
            <td>Staff Email ID</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>Jane Doe</td>
          </tr>
          <tr>
            <td>GSTN</td>
            <td>45</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>Employed</td>
          </tr>
    
          <tr>
            <td>Passport Document</td>
            <td>
              <a href="path/to/passport.pdf" download="PassportDocument.pdf" class="btn btn-sm btn-custom">
                <i class="fa fa-download" aria-hidden="true"></i> Download
              </a>
            </td>
          </tr>
          <tr>
            <td>Offer Letter</td>
            <td>
              <a href="path/to/offerletter.pdf" download="OfferLetter.pdf" class="btn btn-sm btn-custom">
                <i class="fa fa-download" aria-hidden="true"></i> Download
              </a>
            </td>
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
            </div>
        </div>
    );
}
export default AddAgent;
