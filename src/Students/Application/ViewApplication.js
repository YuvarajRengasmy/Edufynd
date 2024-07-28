import React from "react";
import "./viewApplication.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../../compoents/sidebar";
const ViewApplication = () => {
  return (
    <>
      <Sidebar/>
      <div className="content-wrapper">
        <div className="container-fluid mt-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-12">
              <div className="rounded">
                <div className="table-responsive table-border-row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-center">
                          <div className="toggle-btn">
                            <div className="inner-circle" />
                          </div>
                        </th>
                        <th>ApplicationID</th>
                        <th>CourseName</th>
                        <th>status</th>
                        <th>Fees</th>
                        <th>AppliedDate</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      <tr className="cell-1">
                        <td className="text-center">
                          <div className="toggle-btn">
                            <div className="inner-circle" />
                          </div>
                        </td>
                        <td>#SO-13487</td>
                        <td>Gasper Antunes</td>
                        <td><span className="badge badge-success">Fullfilled</span></td>
                        <td>$2674.00</td>
                        <td>Today</td>
                        <td><a href="/TrackApplication" className="text-black-50"><FontAwesomeIcon icon={faEye} className="text-black-50" /></a></td>
                      </tr>
                      <tr className="cell-1">
                        <td className="text-center">
                          <div className="toggle-btn">
                            <div className="inner-circle" />
                          </div>
                        </td>
                        <td>#SO-13487</td>
                        <td>Gasper Antunes</td>
                        <td><span className="badge badge-success">Fullfilled</span></td>
                        <td>$2674.00</td>
                        <td>Today</td>
                        <td><a href="/TrackApplication" className="text-black-50"><FontAwesomeIcon icon={faEye} className="text-black-50" /></a></td>
                      </tr>
                      <tr className="cell-1">
                        <td className="text-center">
                          <div className="toggle-btn">
                            <div className="inner-circle" />
                          </div>
                        </td>
                        <td>#SO-13487</td>
                        <td>Gasper Antunes</td>
                        <td><span className="badge badge-success">Fullfilled</span></td>
                        <td>$2674.00</td>
                        <td>Today</td>
                        <td><a href="/TrackApplication" className="text-black-50"><FontAwesomeIcon icon={faEye} className="text-black-50" /></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
};
export default ViewApplication;