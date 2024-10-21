import Mastersidebar from '../../compoents/sidebar';
import Comission from './University/CommissionPaidOn';
import PopularCategories from './University/popularCategories.js';
import Country from './University/Country.js';
import Accommodation from './EnquiryStatus/accomdation.js';
import Loan from './EnquiryStatus/loanEnquiry.js';
import Flight from './EnquiryStatus/flight.js';
import Forex from './EnquiryStatus/forex.js';
import Business from './EnquiryStatus/business.js';
import General from './EnquiryStatus/general.js';
import Student from './EnquiryStatus/student.js';
import Institution from './University/InstitutionType .js';
import OfferTat from './University/OfferTAT.js';
import PaymentMethod from './University/PaymentMethod.js';
import Tax from './University/tax.js';
import CourseType from './programModule.js';
import ApplicationStatus from './University/ApplicationStatus.js';
import Client from './clientModule.js';


export const UniversityModule = () => {
    return (
        <div>
            <Mastersidebar />
            <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="content-header bg-light shadow-sm sticky-top"></div>
                <div className="container-fluid mt-4">
                    <div className="row">
                        {/* Mobile view navigation */}
                        <ul className="nav nav-pills fs-9 d-sm-block d-lg-none" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="categories-tab" data-bs-toggle="tab" href="#tab-categories" role="tab" aria-controls="tab-categories" aria-selected="true">Popular Categories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="tax-tab" data-bs-toggle="tab" href="#tab-tax" role="tab" aria-controls="tab-tax" aria-selected="false">Tax</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="commission-tab" data-bs-toggle="tab" href="#tab-commission" role="tab" aria-controls="tab-commission" aria-selected="false">Commission Paid On</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="institution-tab" data-bs-toggle="tab" href="#tab-institution" role="tab" aria-controls="tab-institution" aria-selected="false">Institution Type</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="offertat-tab" data-bs-toggle="tab" href="#tab-offertat" role="tab" aria-controls="tab-offertat" aria-selected="false">Offertat</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-payment" role="tab" aria-controls="tab-payment" aria-selected="false">Payment Method</a>
                            </li>
                        </ul>

                        {/* Sidebar for large screens */}
                        <div className="col-md-4 d-lg-block d-none">
                            <div className="card border-0 rounded-1 shadow-sm">
                                <div className="card-body">
                                    <ul className="list-group list-group-flush" id="myTab" role="tablist">
                                        <li className="list-group-item">
                                            <a className="nav-link active" id="categories-tab" data-bs-toggle="tab" href="#tab-categories" role="tab" aria-controls="tab-categories" aria-selected="true">Popular Categories</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="tax-tab" data-bs-toggle="tab" href="#tab-tax" role="tab" aria-controls="tab-tax" aria-selected="false">Tax</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="commission-tab" data-bs-toggle="tab" href="#tab-commission" role="tab" aria-controls="tab-commission" aria-selected="false">Commission Paid On</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="institution-tab" data-bs-toggle="tab" href="#tab-institution" role="tab" aria-controls="tab-institution" aria-selected="false">Institution Type</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="offertat-tab" data-bs-toggle="tab" href="#tab-offertat" role="tab" aria-controls="tab-offertat" aria-selected="false">Offer TAT</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="payment-tab" data-bs-toggle="tab" href="#tab-payment" role="tab" aria-controls="tab-payment" aria-selected="false">Payment Method</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="coursetype-tab" data-bs-toggle="tab" href="#tab-coursetype" role="tab" aria-controls="tab-coursetype" aria-selected="false">Course Type</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="application-tab" data-bs-toggle="tab" href="#tab-application" role="tab" aria-controls="tab-application" aria-selected="false">Application Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="client-tab" data-bs-toggle="tab" href="#tab-client" role="tab" aria-controls="tab-client" aria-selected="false">Client</a>
                                        </li>

                                        {/* Enquiry Status */}
                                        <li className="list-group-item">
                                            <a className="nav-link" id="accommodation-tab" data-bs-toggle="tab" href="#tab-accommodation" role="tab" aria-controls="tab-accommodation" aria-selected="false">Accommodation Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="flight-tab" data-bs-toggle="tab" href="#tab-flight" role="tab" aria-controls="tab-flight" aria-selected="false">Flight Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="forex-tab" data-bs-toggle="tab" href="#tab-forex" role="tab" aria-controls="tab-forex" aria-selected="false">Forex Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="loan-tab" data-bs-toggle="tab" href="#tab-loan" role="tab" aria-controls="tab-loan" aria-selected="false">Loan Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="general-tab" data-bs-toggle="tab" href="#tab-general" role="tab" aria-controls="tab-general" aria-selected="false">General Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="business-tab" data-bs-toggle="tab" href="#tab-business" role="tab" aria-controls="tab-business" aria-selected="false">Business Status</a>
                                        </li>
                                        <li className="list-group-item">
                                            <a className="nav-link" id="student-tab" data-bs-toggle="tab" href="#tab-student" role="tab" aria-controls="tab-student" aria-selected="false">Student Status</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Tab content */}
                        <div className="col-md-8 col-sm-12">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="tab-categories" role="tabpanel" aria-labelledby="categories-tab">
                                    <PopularCategories />
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
                                <div className="tab-pane fade" id="tab-coursetype" role="tabpanel" aria-labelledby="coursetype-tab">
                                    <CourseType />
                                </div>
                                <div className="tab-pane fade" id="tab-application" role="tabpanel" aria-labelledby="application-tab">
                                    <ApplicationStatus />
                                </div>
                                <div className="tab-pane fade" id="tab-client" role="tabpanel" aria-labelledby="client-tab">
                                    <Client />
                                </div>

                                {/* Enquiry Status */}
                                <div className="tab-pane fade" id="tab-accommodation" role="tabpanel" aria-labelledby="accommodation-tab">
                                    <Accommodation />
                                </div>
                                <div className="tab-pane fade" id="tab-flight" role="tabpanel" aria-labelledby="flight-tab">
                                    <Flight />
                                </div>
                                <div className="tab-pane fade" id="tab-forex" role="tabpanel" aria-labelledby="forex-tab">
                                    <Forex />
                                </div>
                                <div className="tab-pane fade" id="tab-loan" role="tabpanel" aria-labelledby="loan-tab">
                                    <Loan />
                                </div>
                                <div className="tab-pane fade" id="tab-general" role="tabpanel" aria-labelledby="general-tab">
                                    <General />
                                </div>
                                <div className="tab-pane fade" id="tab-business" role="tabpanel" aria-labelledby="business-tab">
                                    <Business />
                                </div>
                                <div className="tab-pane fade" id="tab-student" role="tabpanel" aria-labelledby="student-tab">
                                    <Student />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityModule;
