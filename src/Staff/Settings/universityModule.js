import Mastersidebar from '../../compoents/sidebar';
import Comission from "./University/CommissionPaidOn";
import PopularCatageries from "./University/popularCategories.js";
import Country from "./University/Country.js";
import Institution from "./University/InstitutionType .js";
import OfferTat from "./University/OfferTAT.js" ;
import PaymentMethod from "./University/PaymentMethod.js";
import Tax from "./University/tax.js";
import CourseType from "./programModule.js";
import ApplicationStatus from './University/ApplicationStatus.js'
import Client from './clientModule.js'
export const UniversityModule = () => {

    return (
        <div>
      
       
            <Mastersidebar />
       
        <div className="content-wrapper" style={{fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div className="content-header bg-light shadow-sm sticky-top"></div>
                <div className="container-fluid mt-4">
                    <div className="row ">
                    <ul class="nav nav-pills fs-9 d-sm-block d-lg-none" id="myTab" role="tablist">
  <li class="nav-item">  <a className="nav-link active" id="categories-tab" data-bs-toggle="tab" href="#tab-categories" role="tab" aria-controls="tab-categories" aria-selected="true">Popular Categories</a></li>
  <li class="nav-item"> <a className="nav-link" id="tax-tab" data-bs-toggle="tab" href="#tab-tax" role="tab" aria-controls="tab-tax" aria-selected="false" tabindex="-1">Tax</a></li>
  <li class="nav-item"> <a className="nav-link" id="commission-tab" data-bs-toggle="tab" href="#tab-commission" role="tab" aria-controls="tab-commission" aria-selected="false" tabindex="-1">Commission Paid On</a></li>
  <li class="nav-item">  <a className="nav-link" id="institution-tab" data-bs-toggle="tab" href="#tab-institution" role="tab" aria-controls="tab-institution" aria-selected="false" tabindex="-1">Institution Type</a></li>
  <li class="nav-item"><a className="nav-link" id="offertat-tab" data-bs-toggle="tab" href="#tab-offertat" role="tab" aria-controls="tab-offertat" aria-selected="false" tabindex="-1">Offertat</a></li>
  <li class="nav-item"> <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-payment" role="tab" aria-controls="tab-payment" aria-selected="false" tabindex="-1">Payment Method</a></li>
  
</ul>


                    <div className='col-md-4 d-lg-block d-none'>
                  
    <div className='card border-0 rounded-1 shadow-sm  '>
        <div className='card-body'>
            <ul className="list-group list-group-flush" id="myTab" role="tablist">
                <li className="list-group-item" role="presentation">
                <a className="nav-link active" id="categories-tab" data-bs-toggle="tab" href="#tab-categories" role="tab" aria-controls="tab-categories" aria-selected="true">Popular Categories</a>
                </li>
                <li className="list-group-item" role="presentation">
                <a className="nav-link" id="tax-tab" data-bs-toggle="tab" href="#tab-tax" role="tab" aria-controls="tab-tax" aria-selected="false" tabindex="-1">Tax</a>
                </li>
                <li className="list-group-item" role="presentation">
                <a className="nav-link" id="commission-tab" data-bs-toggle="tab" href="#tab-commission" role="tab" aria-controls="tab-commission" aria-selected="false" tabindex="-1">Commission Paid On</a>
                </li>
                <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="institution-tab" data-bs-toggle="tab" href="#tab-institution" role="tab" aria-controls="tab-institution" aria-selected="false" tabindex="-1">Institution Type</a>
                </li>
                <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="offertat-tab" data-bs-toggle="tab" href="#tab-offertat" role="tab" aria-controls="tab-offertat" aria-selected="false" tabindex="-1">Offertat</a>
                </li>
                <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-payment" role="tab" aria-controls="tab-payment" aria-selected="false" tabindex="-1">Payment Method</a>
                </li>
                <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-coursetype" role="tab" aria-controls="tab-coursetype" aria-selected="false" tabindex="-1">Course Type</a>
                </li>
                <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-application" role="tab" aria-controls="tab-application" aria-selected="false" tabindex="-1">Application Status</a>
                </li>
                <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-client" role="tab" aria-controls="tab-client" aria-selected="false" tabindex="-1">Client</a>
                </li>


                {/* <li className="list-group-item" role="presentation">
                    <a className="nav-link" id="country-tab" data-bs-toggle="tab" href="#tab-country" role="tab" aria-controls="tab-country" aria-selected="false" tabindex="-1">Payment Method</a>
                </li> */}
            </ul>
        </div>
    </div>
</div>
<div className='col-md-8 col-sm-12'>
   
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="tab-categories" role="tabpanel" aria-labelledby="categories-tab">
                <PopularCatageries />
                </div>
                <div className="tab-pane fade" id="tab-tax" role="tabpanel" aria-labelledby="tax-tab">
                <Tax />
                </div>
                <div className="tab-pane fade" id="tab-commission" role="tabpanel" aria-labelledby="commission-tab">
                <Comission />
                </div>
                <div className="tab-pane fade" id="tab-institution" role="tabpanel" aria-labelledby="institution-tab">
                <Institution />
                </div>
                <div className="tab-pane fade" id="tab-offertat" role="tabpanel" aria-labelledby="offertat-tab">
                <OfferTat />
                </div>
                <div className="tab-pane fade" id="tab-payment" role="tabpanel" aria-labelledby="payment-tab">
                <PaymentMethod />
                </div>
                {/* <div className="tab-pane fade" id="tab-country" role="tabpanel" aria-labelledby="country-tab">
                 <Country />
                </div> */}
                 <div className="tab-pane fade" id="tab-coursetype" role="tabpanel" aria-labelledby="coursetype-tab">
              <CourseType/>
                </div>
                <div className="tab-pane fade" id="tab-application" role="tabpanel" aria-labelledby="application-tab">
               <ApplicationStatus/>
                </div>
                <div className="tab-pane fade" id="tab-client" role="tabpanel" aria-labelledby="client-tab">
               <Client/>
                </div>

            </div>
        
</div>

                     
                       
                    </div>
                   
                   
                   
                </div>
            </div>
        </div>
  

        
    );
}
export default UniversityModule;