import React, { useState, useEffect } from "react";
import { getSingleStudnetEnquiry} from "../../../api/Enquiry/student";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from '../../../compoents/sidebar';


export const StudentForm = () => {


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
            <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'>Student Enquiry Details</h5>
                </div>
              
               

   
    
      <div class="card-body">
      <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
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
  )
}
export default StudentForm;
