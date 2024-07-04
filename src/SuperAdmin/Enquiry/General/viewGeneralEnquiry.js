import React, { useState, useEffect } from "react";
import { getSingleStudnetEnquiry} from "../../../api/Enquiry/student";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from '../../../compoents/sidebar';


export const ViewGeneralEnquiry = () => {


  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [student, setStudent] = useState();
  const pageSize = 5;
 
  
  useEffect(() => {
      getStudentDetails();
  }, []);


  const getStudentDetails = () => {
    getSingleStudnetEnquiry (id)
          .then((res) => {
              setStudent(res?.data?.result);
          })
          .catch((err) => {
              console.log(err);
          });
  };




  return (
    <div className="student-form" style={{ fontFamily: 'Plus Jakarta Sans' }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Mastersidebar />
        </nav>
        <div className="content-wrapper" style={{ fontSize: '14px' }}>
          <div className="content-header">
            <div className="container">
              <div className="card card-body  border-0 rounded-0 shadow-sm p-4 ">
                <h5 className='text-center text-uppercase'>View General Enquiry</h5>
                <hr className='text-dark border-4 border-dark rounded-3'/>
                <div class=" border-0 text-bg-transparent mb-3 p-1" >
  <div class="row g-0">
    <div class="col-md-4 align-self-center">
      <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" class="img-fluid  w-100  mx-auto d-block " alt="profile-image"/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
       <table className='table table-hover table-striped w-100'>
        <tbody >
          <tr >
            <td className='fw-bold'>Student Name  </td>
            <td>{student?.name}</td>
           
          </tr>
          <tr >
            <td className='fw-bold'>Date Of Birth  </td>
            <td>{formatDate(student?.createdOn)}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Passport No  </td>
            <td>{student?.passportNo}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Contact Number  </td>
            <td>{student?.primaryNumber}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Email ID </td>
            <td>{student?.email}</td>
          </tr> <tr >
            <td className='fw-bold'>CGPA / Year passed  </td>
            <td>{student?.cgpa}/{student?.yearPassed}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Desired Country  </td>
            <td>{student?.desiredCountry}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Desired Course  </td>
            <td>{student?.desiredCourse}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Do you need support for loan?  </td>
            <td>{student?.doYouNeedSupportForLoan}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Qualification  </td>
            <td>{student?.qualification}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Whatsapp Number  </td>
            <td>{student?.whatsAppNumber}</td>
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
    </div>
  )
}
export default ViewGeneralEnquiry;
