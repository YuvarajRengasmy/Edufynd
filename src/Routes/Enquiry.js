import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "../Enquiry/Studentsenquiry/StudentForm";
import EditStudentForm from "../Enquiry/Studentsenquiry/EditStudentForm";
import ListStudentForm from "../Enquiry/Studentsenquiry/ListStudentForm";
import AddStudentForm from "../Enquiry/Studentsenquiry/AddStudentForm";
import AddAccomodation from '../Enquiry/Accomodation/AddAccommodation'
import EditAccomodation from '../Enquiry/Accomodation/EditAccommodation'
import ListAccomodation from '../Enquiry/Accomodation/ListAccommodation'
import ViewAccomodation from '../Enquiry/Accomodation/ViewAccommodation'
import AddBusiness from '../Enquiry/Business/AddBusiness'
import EditBusiness from '../Enquiry/Business/EditBusiness'
import ListBusiness from '../Enquiry/Business/ListBusiness'
import ViewBusiness from '../Enquiry/Business/ViewBusiness'
import AddFlightTicket from '../Enquiry/FlightTicket/AddFlightTicket'
import EditFlightTicket from '../Enquiry/FlightTicket/EditFlightTicket'
import ListFlightTicket from '../Enquiry/FlightTicket/ListFlightTicket'
import ViewFlightTicket from '../Enquiry/FlightTicket/ViewFlightTicket'
import AddForex from '../Enquiry/ForexForm/AddForex'
import ViewForex from '../Enquiry/ForexForm/ViewForex'
import EditForex from '../Enquiry/ForexForm/editForex'
import ListForex from '../Enquiry/ForexForm/listForex'
import AddGeneralEnquiry from '../Enquiry/General/addGeneralEnquiry'
import EditGeneralEnquiry from '../Enquiry/General/editGeneralEnquiry'
import ListGeneralEnquiry from '../Enquiry/General/listGeneralEnquiry'
import ViewGeneralEnquiry from '../Enquiry/General/viewGeneralEnquiry'

import ViewLoanEnquiry from '../Enquiry/Loans/viewLoanEnquiry'
import AddLoanEnquiry from '../Enquiry/Loans/addLoanEnquiry'
import EditLoanEnquiry from '../Enquiry/Loans/editLoanEnquiry'
import ListLoanEnquiry from '../Enquiry/Loans/listLoanEnquiry'

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