import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/StudentForm";
import EditStudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/EditStudentForm";
import ListStudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/ListStudentForm";
import AddStudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/AddStudentForm";
import AddAccomodation from '../SuperAdmin/Enquiry/Accomodation/AddAccommodation'
import EditAccomodation from '../SuperAdmin/Enquiry/Accomodation/EditAccommodation'
import ListAccomodation from '../SuperAdmin/Enquiry/Accomodation/ListAccommodation'
import ViewAccomodation from '../SuperAdmin/Enquiry/Accomodation/ViewAccommodation'
import AddBusiness from '../SuperAdmin/Enquiry/Business/AddBusiness'
import EditBusiness from '../SuperAdmin/Enquiry/Business/EditBusiness'
import ListBusiness from '../SuperAdmin/Enquiry/Business/ListBusiness'
import ViewBusiness from '../SuperAdmin/Enquiry/Business/ViewBusiness'
import AddFlightTicket from '../SuperAdmin/Enquiry/FlightTicket/AddFlightTicket'
import EditFlightTicket from '../SuperAdmin/Enquiry/FlightTicket/EditFlightTicket'
import ListFlightTicket from '../SuperAdmin/Enquiry/FlightTicket/ListFlightTicket'
import ViewFlightTicket from '../SuperAdmin/Enquiry/FlightTicket/ViewFlightTicket'
import AddForex from '../SuperAdmin/Enquiry/ForexForm/AddForex'
import ViewForex from '../SuperAdmin/Enquiry/ForexForm/ViewForex'
import EditForex from '../SuperAdmin/Enquiry/ForexForm/editForex'
import ListForex from '../SuperAdmin/Enquiry/ForexForm/listForex'
import AddGeneralEnquiry from '../SuperAdmin/Enquiry/General/addGeneralEnquiry'
import EditGeneralEnquiry from '../SuperAdmin/Enquiry/General/editGeneralEnquiry'
import ListGeneralEnquiry from '../SuperAdmin/Enquiry/General/listGeneralEnquiry'
import ViewGeneralEnquiry from '../SuperAdmin/Enquiry/General/viewGeneralEnquiry'

import ViewLoanEnquiry from '../SuperAdmin/Enquiry/Loans/viewLoanEnquiry'
import AddLoanEnquiry from '../SuperAdmin/Enquiry/Loans/addLoanEnquiry'
import EditLoanEnquiry from '../SuperAdmin/Enquiry/Loans/editLoanEnquiry'
import ListLoanEnquiry from '../SuperAdmin/Enquiry/Loans/listLoanEnquiry'

function Enquiry() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
       
         <Route path="/ViewStudentForm" element={<StudentForm/>}/>
         <Route path="/ListStudentForm" element={<ListStudentForm/>}/>
         <Route path="/EditStudentForm" element={<EditStudentForm/>}/>
         <Route path="/AddStudentForm" element={<AddStudentForm/>}/>
         <Route path="/AddAccommodation" element={<AddAccomodation/>}/>
         <Route path="/EditAccommodation" element={<EditAccomodation/>}/>
         <Route path="/ListAccommodation" element={<ListAccomodation/>}/>
         <Route path="/ViewAccommodation" element={<ViewAccomodation/>}/>
         <Route path='/AddBusinessEnquiry' element={<AddBusiness/>}/>
         <Route path='/EditBusinessEnquiry' element={<EditBusiness/>}/>
         <Route path='/ListBusinessEnquiry' element={<ListBusiness />}/>
         <Route path='/ViewBusinessEnquiry' element={<ViewBusiness/>}/>
         <Route path="/AddFlightTicket" element={<AddFlightTicket/>}/>
         <Route path="/EditFlightTicket" element={<EditFlightTicket/>}/>
         <Route path="/ListFlightTicket" element={<ListFlightTicket/>}/>
         <Route path="/ViewFlightTicket" element={<ViewFlightTicket/>}/>
         <Route path="/AddForexForm" element={<AddForex/>}/>
         <Route path="/ViewForexForm" element={<ViewForex/>}/>
         <Route path="/EditForexForm" element={<EditForex/>}/>
         <Route path="/ListForexForm" element={<ListForex/>}/>
         <Route path="/AddGeneralEnquiry" element={<AddGeneralEnquiry/>}/>
         <Route path="/EditGeneralEnquiry" element={<EditGeneralEnquiry/>}/>
         <Route path="/ListGeneralEnquiry" element={<ListGeneralEnquiry/>}/>
         <Route path="/ViewGeneralEnquiry" element={<ViewGeneralEnquiry/>}/>
         <Route path="/ViewLoanEnquiry" element={<ViewLoanEnquiry/>}/>
         <Route path="/AddLoanEnquiry" element={<AddLoanEnquiry/>}/>
         <Route path="/EditLoanEnquiry" element={<EditLoanEnquiry/>}/>
         <Route path="/ListLoanEnquiry" element={<ListLoanEnquiry/>}/>



        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Enquiry;