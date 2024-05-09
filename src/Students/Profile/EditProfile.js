import React, { useEffect, useState, useRef } from "react";
import CountryRegion from "countryregionjs";
import Select from 'react-select';
const Profile = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [customInputValue, setCustomInputValue] = useState('');
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    let countryRegion = null;

    const getCountryRegionInstance = () => {
        if (!countryRegion) {
            countryRegion = new CountryRegion();
        }
        return countryRegion;
    };
    
    useEffect(() => {
        const getCountries = async () => {
            try {
                const countries = await getCountryRegionInstance().getCountries();
                setCountries(countries.map(country => ({
                    value: country.id,
                    label: country.name
                })));
            } catch (error) {
                console.error(error);
            }
        }
        getCountries();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setCustomInputValue('');
    };

    const handleCustomInputChange = (e) => {
        setCustomInputValue(e.target.value);
    };

    const handleCountryChange = (event) => {
        const { value } = event;
        setCountry(value);
    };

    return (
        <>
            <div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body pt-3">
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                    <form>
                                        <div className="col-lg-12 col-md-6 col-sm-12">
                                            <div className="upload-img form-group text-center">
                                                <label style={{ color: "#231F20" }}>
                                                    Profile Photo<span className="text-danger">*</span>
                                                </label>
                                                <br />
                                                <label htmlFor="fileInputImage" className="file-upload">
                                                    <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                                                </label>
                                                <input
                                                    name="profileImage"
                                                    id="fileInputImage"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Student Name</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="fullName" type="text" className="form-control" id="fullName" defaultValue="Kevin Anderson" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">PassportNo</label>
                                            <div className="col-md-8 col-lg-9 d-flex">
                                                <input name="company" value={"WNBSP56432"} type={"text"} className="form-control" id="company" />
                                                &nbsp; &nbsp; &nbsp; &nbsp;    <input name="expxire" type="date" className="form-control" id="company" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">DOB</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="job" type="date" className="form-control" id="Job" value="2021-07-22" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Citizenship</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="country" type="text" className="form-control" id="Country" value="USA" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Gender</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="address" type="text" className="form-control" id="Address" value="male" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Whatsapp Number</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                English Language Test
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="categories">Yes</option>
                                                    <option value="">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">TestName </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <select className="form-control" name="campus" value={customInputValue} onChange={handleCustomInputChange}>
                                                            <option value="">Test Name</option>
                                                            <option value="">IELTS</option>
                                                            <option value="">PTE</option>
                                                            <option value="">TOEFL</option>
                                                            <option value="">Duolingo</option>
                                                        </select>
                                                    </div><br /><br />
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Test Score</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input type="text" className="form-control" value={customInputValue} onChange={handleCustomInputChange} placeholder="Enter TheTest Score" />
                                                    </div><br /><br />
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Date of Test</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input type="text" className="form-control" value={customInputValue} onChange={handleCustomInputChange} placeholder="Enter The Date of Test" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Country </label>
                                            <div className="col-md-8 col-lg-9">
                                                <section className="submain-one-form-body-subsection">
                                                    <Select
                                                        type="text"
                                                        placeholder="Select a country"
                                                        id="name"
                                                        onChange={handleCountryChange}
                                                        options={countries}
                                                        className="submain-one-form-body-subsection-select"
                                                    />
                                                </section>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Desired University </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="PES uNIversity" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Course </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="email" type="email" className="form-control" id="Email" defaultValue="MSC" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Work Experience</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="2Year" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                Any visa rejections
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="categories">Yes</option>
                                                    <option value="">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Reason  </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <textarea name="about" className="form-control" style={{ height: 100 }} defaultValue={"Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde."} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                Do you have a travel history
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="categories">Yes</option>
                                                    <option value="">No</option>
                                                </select>
                                            </div>
                                            <br /><br />
                                            {selectedOption === 'categories' && (
                                                <div className="row mb-3">
                                                    <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">Reason  </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <textarea name="about" className="form-control" style={{ height: 100 }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Finance</label>
                                            <div className="col-md-8 col-lg-9">
                                                <select className="form-control" name="campus" >
                                                    <option value="">Self Funding</option>
                                                    <option value="">Loan</option>
                                                </select>
                                            </div>
                                        </div><br />
                                        <h4>Highest Qualification :</h4>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Degree Name </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="BE" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Academic Year & Year Passed </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="date" className="form-control" id="Phone" defaultValue="23-08-2020" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Institution</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="Anna uNIversity" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Percentage </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="68%" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-settings">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                                            <div className="col-md-8 col-lg-9">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked />
                                                    <label className="form-check-label" htmlFor="changesMade">
                                                        Changes made to your account
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked />
                                                    <label className="form-check-label" htmlFor="newProducts">
                                                        Information on new products and services
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="proOffers" />
                                                    <label className="form-check-label" htmlFor="proOffers">
                                                        Marketing and promo offers
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled />
                                                    <label className="form-check-label" htmlFor="securityNotify">
                                                        Security alerts
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="password" type="password" className="form-control" id="currentPassword" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="newpassword" type="password" className="form-control" id="newPassword" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Change Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;