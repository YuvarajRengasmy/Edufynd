import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Country from "../SuperAdmin/University/Country";
import AddUniversity from "../SuperAdmin/University/addUniversity";
import ListUniversity from "../SuperAdmin/University/ListUniversity"
import ViewUniversity from "../SuperAdmin/University/viewUniversity";
import EditUniversity from "../SuperAdmin/University/editUniversity";
import ViewProgram from "../SuperAdmin/Program/ViewProgram";
import ListStudent from "../SuperAdmin/Students/listStudent";
import AddStudentSA from "../SuperAdmin/Students/addStudent";
import ViewStudent from "../SuperAdmin/Students/viewStudent"
import Editstudent from "../SuperAdmin/Students/editStudent";
import AddAgent from "../SuperAdmin/Agnent/addAgent";
import ListAgent from "../SuperAdmin/Agnent/ListAgent";
import Program from "../SuperAdmin/Program/Programs";
import ViewAgent from "../SuperAdmin/Agnent/viewAgent";
import EditAgent from "../SuperAdmin/Agnent/editAgent";
import AdminList from "../SuperAdmin/Admins/AdminList";
import AddAdmin from "../SuperAdmin/Admins/AdminAdd";
import EditAdmin from "../SuperAdmin/Admins/EditAdmin";
import ViewAdmin from "../SuperAdmin/Admins/ViewAdmin";
import CountryList from "../SuperAdmin/Admins/country";
import AddProgram from "../SuperAdmin/Program/addProgram";
import EditProgram from "../SuperAdmin/Program/editProgram";
import DashboardSA from "../SuperAdmin/DashBoard/Home";
// Client
import AddClient from "../SuperAdmin/client/addclient";
import ListClient from "../SuperAdmin/client/ListClient";
import ViewClient from "../SuperAdmin/client/ViewClient";
import EditClient from "../SuperAdmin/client/Edit";
import GlobalSettings from "../SuperAdmin/Settings/GlobalSettings";
import CurrencySettings  from "../SuperAdmin/Settings/currencySetting";
import UniversitySettings from "../SuperAdmin/Settings/universityModule";
import ProgramModule from "../SuperAdmin/Settings/programModule";
import ClientModule from "../SuperAdmin/Settings/clientModule";
import Status from "../SuperAdmin/Settings/Status"
import Intake from "../SuperAdmin/Settings/intake"
import Year from "../SuperAdmin/Settings/Year"


import ListApplication from "../SuperAdmin/Application/ListApplication";
import ListStaff from "../SuperAdmin/Staff/listStaff";
import AddStaff from "../SuperAdmin/Staff/addStaff";
import EditStaff from "../SuperAdmin/Staff/editStaff";
import ViewStaff from "../SuperAdmin/Staff/viewStaff";



import Application from "../SuperAdmin/Application/Application";
import ViewUniversity1 from "../SuperAdmin/University/viewUniversity1";
import ApplyJob from "../Students/Program/ApplyProgram";
import Listinvoice from "../SuperAdmin/Invoices/Listinvoice";
import Editinvoice from "../SuperAdmin/Invoices/Editinvoice";
import Viewinvoice from "../SuperAdmin/Invoices/Viewinvoice";
import SenderViewinvoice from "../SuperAdmin/Invoices/ReciverViewInvoice";
import AddSenderInvoice from "../SuperAdmin/Invoices/AddSenderInvoice";
import AddRecieverInvoice from "../SuperAdmin/Invoices/AddRecieverInvoice";
import AddApplication from "../SuperAdmin/Application/AddApplication";
import EditApplication from "../SuperAdmin/Application/EditApplication";
import AddCommission from "../SuperAdmin/commission/addCommission";
import EditCommission from "../SuperAdmin/commission/EditComission";
import ViewComission from "../SuperAdmin/commission/ViewComission";
import ListCommission from "../SuperAdmin/commission/ListCommission";
import { ListNotifications } from "../SuperAdmin/Notifications/ListNotifications";
import EditNotifications from "../SuperAdmin/Notifications/EditNotifications";
import AddNotifications from "../SuperAdmin/Notifications/AddNotifications";
import ViewNotifications from "../SuperAdmin/Notifications/ViewNotifications";
import ListTraining from "../SuperAdmin/Training/ListTraining";
import ListTestimonials from "../SuperAdmin/Testimonials/ListTestimonials";
import ListPromotions from "../SuperAdmin/Promotion/ListPromotions";
import ListMeetings from "../SuperAdmin/Meetings/ListMeetings";
import ListEvents from "../SuperAdmin/Events/ListEvents";
import AddEvents from "../SuperAdmin/Events/AddEvents";
import EditEvents from "../SuperAdmin/Events/EditEvents";
import AddMeetings from "../SuperAdmin/Meetings/AddMeetings";
import EditMeetings from "../SuperAdmin/Meetings/EditMeetings";
import AddPromotions from "../SuperAdmin/Promotion/AddPromotions";
import EditPromotions from "../SuperAdmin/Promotion/EditPromotions";
import AddTestimonials from "../SuperAdmin/Testimonials/AddTestimonials";
import EditTestimonials from "../SuperAdmin/Testimonials/EditTestimonials";
import AddTraining from "../SuperAdmin/Training/AddTraining";
import EditTraining from "../SuperAdmin/Training/EditTraining";
import ViewTraining from "../SuperAdmin/Training/ViewTraining";
import ViewEvents from "../SuperAdmin/Events/ViewEvents";
import ViewMeetings from "../SuperAdmin/Meetings/ViewMeetings";
import ViewPromotion from "../SuperAdmin/Promotion/ViewPromotion";
import ViewTestimonials from "../SuperAdmin/Testimonials/ViewTestimonials";
import AddSocialMedia from "../SuperAdmin/Marketing/SocialMedia/AddSocialMedia";
import EditSocialMedia from "../SuperAdmin/Marketing/SocialMedia/EditSocialMedia";
import ListSocialMedia from "../SuperAdmin/Marketing/SocialMedia/ListSocialMedia";
import ViewSocialMedia from "../SuperAdmin/Marketing/SocialMedia/ViewSocialMedia";
import ListCampaign from "../SuperAdmin/Marketing/Campaign/ListCampaign";
import AddCampaign from "../SuperAdmin/Marketing/Campaign/AddCampaign";
import EditCampaign from "../SuperAdmin/Marketing/Campaign/EditCampaign";
import ViewCampaign from "../SuperAdmin/Marketing/Campaign/ViewCampaign";
import ListDailyTask from "../SuperAdmin/Marketing/DailyTask/ListDailyTask";
import EditDailyTask from "../SuperAdmin/Marketing/DailyTask/EditDailyTask";
import AddDailyTask from "../SuperAdmin/Marketing/DailyTask/AddDailyTask";
import ViewDailyTask from "../SuperAdmin/Marketing/DailyTask/ViewDailyTask";
import ListBlog from "../SuperAdmin/Blog/ListBlog";
import AddBlog from "../SuperAdmin/Blog/AddBlog";
import ViewBlog from "../SuperAdmin/Blog/ViewBlog";
import EditBlog from "../SuperAdmin/Blog/EditBlog";


function SuperAdmin() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/Demo" element={<Country />} />
          <Route path="/AddUniversity" element={<AddUniversity />} />
          <Route path="/ListUniversity" element={<ListUniversity />} />
          <Route path="/ViewUniversity" element={<ViewUniversity />} />
          <Route path="/EditUniversity" element={<EditUniversity />} />
          <Route path="/ViewProgram" element={<ViewProgram />} />
          <Route path="/ListStudent" element={<ListStudent />} />
          <Route path="/AddStudentSA" element={<AddStudentSA />} />
          <Route path="/ViewStudent" element={<ViewStudent />} />
          <Route path="/EditStudent" element={<Editstudent />} />
          <Route path="/AddAgent" element={<AddAgent />} />
          <Route path="/ListAgent" element={<ListAgent />} />
          <Route path="/Programs" element={<Program />} />
          <Route path="/ViewAgent" element={<ViewAgent />} />
          <Route path="/EditAgent" element={<EditAgent />} />
          <Route path="/AdminList" element={<AdminList />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/EditAdmin" element={<EditAdmin />} />
          <Route path="/ViewAdmin" element={<ViewAdmin />} />
          <Route path="/CountryList" element={<CountryList />} />
          <Route path="/AddProgram" element={<AddProgram />} />
          <Route path="/EditProgram" element={<EditProgram />} />
          <Route path="/DashBoard" element={<DashboardSA />} />
          {/* Client */}
          <Route path="/AddClient" element={<AddClient />} />
          <Route path="/client" element={<ListClient />} />
          <Route path="/EditClient" element={<EditClient />} />
          <Route path="/viewClient" element={<ViewClient/>}/>
          <Route path="/GlobalSettings" element={<GlobalSettings/>}/>
          <Route path="/CurrencySettings" element={<CurrencySettings/>}/>
          <Route path="/UniversitySettings" element={<UniversitySettings/>}/>
          <Route path="/ProgramModule" element={<ProgramModule/>}/>
          <Route path="/ClientModule" element={<ClientModule/>}/>
          <Route path="/Status" element={<Status/>}/>
          <Route path="/Intake" element={<Intake/>}/>
          <Route path="/YearSetting" element={<Year/>}/>
          <Route path='/ListApplication' element={<ListApplication/>}/>
          <Route path='/Application' element={<Application/>}/>
       <Route path="/ViewUniversityPage" element={<ViewUniversity1/>}/>
       <Route path="/ApplyJob" element={<ApplyJob/>}/>
       <Route path = "/ListStaff" element={<ListStaff/>}/>
       <Route path = "/AddStaff" element={<AddStaff/>}/>
       <Route path = "/EditStaff" element={<EditStaff/>}/>
       <Route path = "/ViewStaff" element={<ViewStaff/>}/>
       <Route path="/ListInvoice" element={<Listinvoice/>}/>
      <Route path="/AddSenderInvoice" element={<AddSenderInvoice/>}/>
      <Route path="/AddRecieverInvoice" element={<AddRecieverInvoice/>}/>
       <Route path="/EditInvoice" element={<Editinvoice/>}/>
       <Route path="/ViewInvoice" element={<Viewinvoice/>}/>
       <Route path="/SenderViewInvoice" element={<SenderViewinvoice/>}/>
       <Route path="/AddApplication" element={<AddApplication/>}/>
       <Route path='/EditApplication' element={<EditApplication/>}/>
       <Route path="/AddCommission" element={<AddCommission/>}/>
       <Route path="/EditCommission" element={<EditCommission/>}/>
       <Route path="/ViewCommission" element={<ViewComission/>}/>
       <Route path="/ListCommission" element={<ListCommission/>}/>
       <Route path="/ListNotifications" element={<ListNotifications/>}/>
       <Route path="/EditNotifications" element={<EditNotifications/>}/>
       <Route path="/AddNotifications" element={<AddNotifications/>}/>
       <Route path="/ViewNotifications" element={<ViewNotifications/>}/>


       <Route path="/ListTraining" element={<ListTraining/>}/>
       <Route path="/AddTraining" element={<AddTraining/>}/>
       <Route path="/EditTraining" element={<EditTraining/>}/>
       <Route path="/ViewTraining" element={<ViewTraining/>}/>
      
       <Route path="/ListEvents" element={<ListEvents/>}/>
       <Route path="/AddEvents" element={<AddEvents/>}/>
       <Route path="/EditEvents" element={<EditEvents/>}/>
       <Route path="/ViewEvents" element={<ViewEvents/>}/>

    

       <Route path="/AddSocialMedia" element={<AddSocialMedia/>}/>
       <Route path="/EditSocialMedia" element={<EditSocialMedia/>}/>
       <Route path="/ListSocialMedia" element={<ListSocialMedia/>}/>
       <Route path="/ViewSocialMedia" element={<ViewSocialMedia/>}/>



       <Route path="/ListCampaign" element={<ListCampaign/>}/>
       <Route path="/AddCampaign" element={<AddCampaign/>}/>
       <Route path="/EditCampaign" element={<EditCampaign/>}/>
       <Route path="/ViewCampaign" element={<ViewCampaign/>}/>

    
   <Route path="/ListDailyTask" element={<ListDailyTask/>}/>
   <Route path="/EditDailyTask" element={<EditDailyTask/>}/>
   <Route path="/AddDailyTask" element={<AddDailyTask/>}/>
   <Route path="/ViewDailyTask" element={<ViewDailyTask/>}/>
       

      
       <Route path="/ListMeetings" element={<ListMeetings/>}/>
       <Route path="/AddMeetings" element={<AddMeetings/>}/>
       <Route path="/EditMeetings" element={<EditMeetings/>}/>
       <Route path="/ViewMeetings" element={<ViewMeetings/>}/>

       <Route path="/ListPromotions" element={<ListPromotions/>}/>
       <Route path="/AddPromotions" element={<AddPromotions/>}/>
       <Route path="/EditPromotions" element={<EditPromotions/>}/>
       <Route path="/ViewPromotion" element={<ViewPromotion/>}/>

       <Route path="/ListTestimonials" element={<ListTestimonials/>}/>
       <Route path="/AddTestimonials" element={<AddTestimonials/>}/>
       <Route path="/EditTestimonials" element={<EditTestimonials/>}/>
       <Route path="/ViewTestimonials" element={<ViewTestimonials/>}/>
      
      <Route path="/ListBlog" element={<ListBlog/>}/>
      <Route path="/AddBlog" element={<AddBlog/>}/>
      <Route path="/EditBlog" element={<EditBlog/>}/>
      <Route path="/ViewBlog" element={<ViewBlog/>}/>
      

    
       

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default SuperAdmin;
