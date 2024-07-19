import Mastersidebar from '../../compoents/sidebar';
import Comission from "./University/CommissionPaidOn";
import PopularCatageries from "./University/popularCategories.js";
import Country from "./University/Country.js";
import Institution from "./University/InstitutionType .js";
import OfferTat from "./University/OfferTAT.js" ;
import PaymentMethod from "./University/PaymentMethod.js";
import Tax from "./University/tax.js";
export const UniversityModule = () => {

    return (
        <div>
            <div style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
    <div className="container-fluid">
        <nav className='navbar navbar-vertical navbar-expand-lg'>
            <Mastersidebar />
        </nav>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row ">
                        <div className='col-lg-6'>
                            <PopularCatageries />
                        </div>
                        <div className='col-lg-6'>
                        {/* <Country /> */}
                        <Tax />
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-lg-6'>
                        <Comission />
                        </div>
                        <div className='col-lg-6'>
                            <Institution />
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-lg-6'>
                            <OfferTat />
                        </div>
                        <div className='col-lg-6'>
                            <PaymentMethod />
                        </div>
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