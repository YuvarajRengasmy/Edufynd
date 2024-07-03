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
                <nav class="navbar navbar-vertical navbar-expand">
                <Header />
                   
                </nav>
               
         
            <div className="content-wrapper" style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="content-header mt-3">
                    <div className="content container-fluid w-75">
                        <form >
                            <div className="content-page-header">
                                <h5 className="text-bold" style={{ color: "#231F20" }}>
                                   View Admin
                                </h5>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Admin Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Admin name"
                                            name="adminName"
                                            value={admin?.name}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Email<span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <input
                                                type="text"
                                                className="form-control "
                                                placeholder="Enter Passport No"
                                                name="Country"
                                                value={admin?.email}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Password<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            name="Country"
                                            value={admin?.password}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Role <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Role"
                                            name="role"
                                            value={admin?.role}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            name="contactNumber"
                                            value={admin?.contactNumber}
                                        />
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
