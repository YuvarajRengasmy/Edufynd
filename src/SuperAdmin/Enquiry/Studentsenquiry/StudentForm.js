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
    <>
      <div >
        
          <Mastersidebar />
       
        <div className="content-wrapper" style={{ fontSize: '14px' }}>
          <div className="content-header">
            <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'>View Student Enquiry Details</h5>
                </div>
              
               

   
    
      <div class="card-body">
      <table className='table table-hover table-bordered table-striped-columns mt-5'  style={{ fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
        <tbody >
        <tr >
            <td className='fw-bold'>Source  </td>
            <td>{student?.source}</td>
           
          </tr>
          <tr >
            <td className='fw-bold'>Student Name  </td>
            <td>{student?.name}</td>
           
          </tr>
          <tr >
            <td className='fw-bold'>Gender  </td>
            <td>{student?.gender}</td>
           
          </tr>
          <tr >
            <td className='fw-bold'>Date Of Birth  </td>
            <td>{formatDate(student?.dob)}</td>
          </tr>
          <tr >
            <td className='fw-bold'>CitizenShip</td>
            <td>{student?.citizenShip}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Passport No  </td>
            <td>{student?.passportNo}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Expiry Date  </td>
            <td>{formatDate(student?.expiryDate)}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Email ID </td>
            <td>{student?.email}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Primary Number </td>
            <td>{student?.primaryNumber}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Whatsapp Number  </td>
            <td>{student?.whatsAppNumber}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Qualification  </td>
            <td>{student?.qualification}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Year passed  </td>
            <td>{student?.yearPassed}</td>
          </tr>
          <tr >
            <td className='fw-bold'>CGPA   </td>
            <td>{student?.cgpa}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Desired Country  </td>
            <td>{student?.desiredCountry}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Desired University </td>
            <td>{student?.desiredUniversity}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Desired Course  </td>
            <td>{student?.desiredCourse}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Do You Hold Any Other Offer?  </td>
            <td>{student?.doYouHoldAnyOtherOffer}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Country  </td>
            <td>{student?.country?student?.country:"N/A"}</td>
          </tr>
          <tr >
            <td className='fw-bold'>University  </td>
            <td>{student?.university?student?.university:"N/A"}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Program </td>
            <td>{student?.program?student?.program:"N/A"}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Referee Name  </td>
            <td>{student?.refereeName?student?.refereeName:"N/A"}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Referee Contact  </td>
            <td>{student?.refereeContactNo?student?.refereeContactNo:"N/A"}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Register for IELTS class  </td>
            <td>{student?.registerForIELTSClass}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Do you need support for loan?  </td>
            <td>{student?.doYouNeedSupportForLoan}</td>
          </tr>
          <tr >
            <td className='fw-bold'>Assigned To  </td>
            <td>{student?.assignedTo}</td>
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
}
export default StudentForm;
