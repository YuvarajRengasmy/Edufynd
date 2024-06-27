import React, { useEffect, useState } from 'react';
import { getallCountry } from "../../api/globalsettings";
import { getallClient } from "../../api/client";
import { isValidEmail } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getallCategories } from '../../api/universityModule/categories';
import { getallOfferTatModule } from '../../api/universityModule/offerTat';
import { getallInstitutionModule } from '../../api/universityModule/institutation';
import { getallTaxModule } from "../../api/universityModule/tax";
import { getallCommission } from "../../api/universityModule/commission";
import { getallModule } from "../../api/allmodule";
import Sidebar from "../../compoents/sidebar";
import Select from 'react-select';
import Flags from 'react-world-flags';
import CountryRegion from "countryregionjs";
import { updateUniversity, getSingleUniversity } from "../../api/university";




function Profile() {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const initialState = {
    businessName: "",
    banner: "",
    universityLogo: "",
    universityName: "",
    courseType: "",
    country: "",
    state: "",
    lga: "",
    ranking: "",
    averageFees: "",
    popularCategories: [],
    admissionRequirement: "",
    offerTAT: "",
    email: "",
    founded: "",
    institutionType: "",
    costOfLiving: "",
    grossTuition: "",
    applicationFees: "",
    paymentMethod: "",
    amount: "",
    percentage: "",
    eligibilityForCommission: "",
    currency: "",
    paymentTAT: "",
    tax: "",
    commissionPaidOn: "",
    countryName: "",
    flag: "",
  };

  const initialStateErrors = {
    businessName: { required: false },
    universityLogo: { required: false },
    banner: { required: false },
    universityName: { required: false },
    email: { required: false, valid: false },
    country: { required: false },
    courseType: { required: false },
    state: { required: false },
    lga: { required: false },
    ranking: { required: false },
    averageFees: { required: false },
    popularCategories: { required: false },
    admissionRequirement: { required: false },
    offerTAT: { required: false },
    founded: { required: false },
    institutionType: { required: false },
    costOfLiving: { required: false },
    grossTuition: { required: false },
    applicationFees: { required: false },
    paymentMethod: { required: false },
    amount: { required: false },
    percentage: { required: false },
    eligibilityForCommission: { required: false },
    currency: { required: false },
    paymentTAT: { required: false },
    tax: { required: false },
    commissionPaidOn: { required: false },
    countryName: { required: false },
    flag: { required: false },
  };

  const [university, setUniversity] = useState(initialState);

  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [country, setCountry] = useState([]);
  const [categorie, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institutation, setInstitution] = useState([]);
  const [tax, setTax] = useState([]);
  const [commission, setCommission] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [lgas, setLGAs] = useState([]);
  const [selectedLGAs, setSelectedLGAs] = useState([]);
  const [type, setType] = useState([]);
  const ZERO = 0;
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  let countryRegion = null;
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (data.universityName === "") error.universityName.required = true;
    if (data.businessName === "") error.businessName.required = true;
    if (data.ranking === "") error.ranking.required = true;
    if (data.averageFees === "") error.averageFees.required = true;
    if (data.courseType.length === 0) error.courseType.required = true;
    if (data.popularCategories.length === 0) error.popularCategories.required = true;
    if (data.offerTAT === "") error.offerTAT.required = true;
    if (data.email === "") error.email.required = true;
    if (data.founded === "") error.founded.required = true;
    if (data.institutionType === "") error.institutionType.required = true;
    if (data.costOfLiving === "") error.costOfLiving.required = true;
    if (data.grossTuition === "") error.grossTuition.required = true;
    if (data.applicationFees === "") error.applicationFees.required = true;
    if (data.paymentMethod === "") error.paymentMethod.required = true;
    if (data.eligibilityForCommission === "") error.eligibilityForCommission.required = true;
    if (data.countryName === "") error.countryName.required = true;
    if (data.flag === "") error.flag.required = true;
    if (data.currency === "") error.currency.required = true;
    if (data.paymentTAT === "") error.paymentTAT.required = true;
    if (data.tax === "") error.tax.required = true;
    if (data.commissionPaidOn === "") error.commissionPaidOn.required = true;
    if (!isValidEmail(data.email)) error.email.valid = true;
    return error;
  };

  useEffect(() => {
    getUniversityDetails();
    getClientList();
    getCountryList();
    getAllCatgoeryDetails();
    getAllCourseDetails();
    getOfferTatList();
    getAllInstitutionDetails();
    getAllTaxDetails();
    getAllCommission();
  }, []);

  const getUniversityDetails = () => {
    getSingleUniversity(id)
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCourseDetails = () => {
    getallModule()
      .then((res) => {
        console.log(res);
        setType(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClientList = () => {
    getallClient()
      .then((res) => {
        const value = res?.data?.result;
        setClient(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCountryList = () => {
    getallCountry()
      .then((res) => {
        const value = res?.data?.result;
        setCountry(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCatgoeryDetails = () => {
    getallCategories()
      .then((res) => {
        console.log(res);
        setCategories(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOfferTatList = () => {
    getallOfferTatModule()
      .then((res) => {
        const value = res?.data?.result;
        setOfferTat(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllInstitutionDetails = () => {
    getallInstitutionModule()
      .then((res) => {
        console.log(res);
        setInstitution(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllTaxDetails = () => {
    getallTaxModule()
      .then((res) => {
        console.log(res);
        setTax(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCommission = () => {
    getallCommission()
      .then((res) => {
        console.log(res);
        setCommission(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };



  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUniversity((prevUniversity) => ({
        ...prevUniversity,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setUniversity((prevUniversity) => {
        const updatedUniversity = { ...prevUniversity, [name]: value };


        if (name === "countryName") {
          const details = countryToDetails[value] || { currency: "", flag: "" };
          return { ...updatedUniversity, ...details };
        }

        return updatedUniversity;
      });
    }
    if (submitted) {
      const newError = handleValidation({ ...university, [name]: value });
      setErrors(newError);
    }
  };

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUniversity({ ...university, [name]: values });
  };



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

  useEffect(() => {
    const getStates = async () => {
      try {
        const states = await getCountryRegionInstance().getStates(selectedCountry);
        setStates(states.map(userState => ({
          value: userState?.id,
          label: userState?.name
        })));
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    const getLGAs = async () => {
      try {
        const allLGAs = await Promise.all(selectedStates.map(async (state) => {
          const lgas = await getCountryRegionInstance().getLGAs(selectedCountry, state.value);
          return lgas.map(lga => ({
            value: lga?.id,
            label: lga?.name
          }));
        }));
        setLGAs(allLGAs.flat());
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedStates.length > 0) {
      getLGAs();
    }
  }, [selectedStates, selectedCountry]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedStates([]);
    setSelectedLGAs([]); // Reset selected LGAs when country changes
  };


  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions || []);
    setSelectedLGAs([]); // Reset selected LGAs when states change
  };

  const handleLGAChange = (selectedOptions) => {
    setSelectedLGAs(selectedOptions || []);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(university);
    setErrors(newError);
    setSubmitted(true);


    const selectedCountryLabel = countries.find(country => country.value === selectedCountry)?.label || "";
    const selectedStatesLabels = selectedStates.map(state => state.label);
    const selectedLGAsLabels = selectedLGAs.map(lga => lga.label);


    const updatedUniversity = {
      ...university,
      country: selectedCountryLabel,
      state: selectedStatesLabels,
      lga: selectedLGAsLabels
    };

    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);

    if (valid) {
      updateUniversity(updatedUniversity)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListUniversity");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };




  const countryToDetails = {
    "United States": { currency: "USD", flag: "us" },
    "Canada": { currency: "CAD", flag: "ca" },
    "United Kingdom": { currency: "GBP", flag: "gb" },
    "Australia": { currency: "AUD", flag: "au" },
    "India": { currency: "INR", flag: "in" },

  };
  const popularCategoriesOptions = categorie.map((data) => ({ value: data.popularCategories, label: data.popularCategories }));
  const courseTypeOptions = type.map((data) => ({ value: data.courseType, label: data.courseType }));





  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.4783px solid rgba(11, 70, 84, 0.25)',
      borderRadius: '4.91319px',
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#3B0051' : '#F2CCFF',
      ':hover': {
        color: 'black'
      }
    })
  };

  return (

    <>
      <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />

          </nav>
        </div>
        <div className="content-wrapper " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="content-header ">
            <div className="content container-fluid ">
              <form onSubmit={handleSubmit} >

                <div className="row">

                  <div className="col-xl-12 ">
                    <div className="card rounded-2 border-0 ">
                      <div className=' position-relative'>

                        <label htmlFor="banner" className="file-upload" style={{ color: "#231F20" }}>
                          <img class="card-img-top  " src={university?.banner ? university?.banner : "https://wallpapercave.com/wp/wp6837474.jpg"} alt="image" style={{ width: '60rem', height: '12rem', objectFit: 'cover' }} />

                        </label>

                        <input
                          name="banner"
                          id="banner"
                          type="file"
                          accept="image/*"
                          className="form-control border-0 text-dark bg-transparent"
                          style={{ display: "none", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          onChange={handleInputs}
                        />


                        <label htmlFor="fileInputImage" className="file-upload" style={{ color: "#231F20" }}>
                          <img class="img-fluid rounded-pill position-absolute  " src={university?.universityLogo ? university?.universityLogo : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"} alt="image" style={{ width: '8rem', height: '7rem', left: '40%', top: '20%' }} />
                        </label>

                        <input
                          name="universityLogo"
                          id="fileInputImage"
                          type="file"
                          accept="image/*"
                          className="form-control border-0 text-dark bg-transparent"
                          style={{ display: "none", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                          onChange={handleInputs}
                        />
                      </div>
                      <div className="card-header justify-content-between d-sm-flex d-block" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                          University Details :
                        </div>

                      </div>
                      <div className="card-body">
                        <div className="row gy-4">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Client Name<span className="text-danger">*</span>
                            </label>
                            <select onChange={handleInputs} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} value={university?.businessName} className="form-select rounded-2 p-2 " name='businessName'>
                              <option value={""} disabled hidden >{university?.businessName}</option>
                              {client.map((data, index) =>
                                <option key={index} value={data?.businessName}> {data?.businessName}</option>)}
                            </select>
                            {errors.businessName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }} >
                              {" "}
                              University Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter name"
                              value={university?.universityName}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="universityName"
                              onChange={handleInputs}
                            />
                            {errors.universityName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Ranking
                            </label>
                            <input
                              type="text"
                              value={university?.ranking}
                              className="form-control "
                              placeholder="Enter Country "
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="ranking"
                              onChange={handleInputs}
                            />
                            {errors.ranking.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>



                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Email<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              value={university?.email}
                              className="form-control "
                              placeholder="Enter Email"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="email"
                              onChange={handleInputs}
                            />
                            {errors.email.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : errors.email.valid ? (
                              <div className="text-danger form-text">
                                Enter valid Email Id.
                              </div>
                            ) : null}

                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Country Name<span className="text-danger">*</span>
                            </label>
                            <Select
                              placeholder="Select a country"
                              onChange={handleCountryChange}
                              options={countries}
                              value={university?.country ? { value: university.country, label: university.country } : null}
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.country.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              state<span className="text-danger">*</span>
                            </label>
                            {states.length !== ZERO && (
                              <Select
                                placeholder="Select a state"
                                isMulti
                                onChange={handleStateChange}
                                value={university?.state ? university?.state.map(state => ({ value: state, label: state })) : null}


                                options={states}
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                            )}
                            {errors.state.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              city<span className="text-danger">*</span>
                            </label>
                            {lgas.length !== ZERO && (
                              <Select
                                placeholder="Select a Substate"
                                isMulti
                                onChange={handleLGAChange}
                                value={university?.lga ? university.lga.map(lga => ({ value: lga, label: lga })) : selectedLGAs}
                                options={lgas}
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Founded <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter founded"
                              value={university?.founded}
                              name="founded"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              onChange={handleInputs}
                            />
                            {
                              errors.founded.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>


                          <div className="card-header justify-content-between d-sm-flex d-block" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                            <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                              Course Details :
                            </div>

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

<label style={{ color: "#231F20" }}>
 courseType<span className="text-danger">*</span>
</label>

<Select
  isMulti
  options={courseTypeOptions}
  value={university?.courseType ? university?.courseType.map(courseType => ({ value: courseType, label: courseType })) : null}
  name="courseType"
  onChange={handleSelectChange}
  styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
/>

{errors.courseType.required && (
  <div className="text-danger form-text">
    This field is required.
  </div>
)}
</div>
                     

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Institution Type <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="institutionType"
                              onChange={handleInputs}
                              value={university?.institutionType}
                            >
                              <option value={" "}>Select Institution Type</option>
                              {institutation.map((data, index) =>
                                <option key={index} value={data?.institutionType}> {data?.institutionType}</option>)}
                            </select>
                            {
                              errors.institutionType.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Cost Of living <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={university?.costOfLiving}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Enter cost of living"
                              name="costOfLiving"
                              onChange={handleInputs}
                            />
                            {
                              errors.costOfLiving.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

<label style={{ color: "#231F20" }}>
  Popular Categories<span className="text-danger">*</span>
</label>

<Select
  isMulti
  options={popularCategoriesOptions}
  value={university?.popularCategories ? university?.popularCategories.map(popularCategories => ({ value: popularCategories, label: popularCategories })) : null}
  name="popularCategories"
  onChange={handleSelectChange}
  styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
/>

{errors.popularCategories.required && (
  <div className="text-danger form-text">
    This field is required.
  </div>
)}
</div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Application Fees<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={university?.applicationFees}
                              placeholder="Enter Average Fees"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="applicationFees"
                              onChange={handleInputs}
                            />
                            {
                              errors.applicationFees.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              OfferTAT<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              name="offerTAT"
                              value={university?.offerTAT}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              onChange={handleInputs}
                            > <option value={" "}>select OfferTAT</option>
                              {offerTAT.map((data, index) =>
                                <option key={index} value={data?.offerTAT}> {data?.offerTAT}</option>)}

                            </select>
                            {errors.offerTAT.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Average Fees<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={university?.averageFees}
                              placeholder="Enter Average Fees"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="averageFees"
                              onChange={handleInputs}
                            />
                            {
                              errors.averageFees.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>




                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                             Application Fees Waiver <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter cost of living"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="grossTuition"
                              onChange={handleInputs}
                            />
                            {
                              errors.grossTuition.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }
                          </div>


                          <div className="card-header justify-content-between d-sm-flex d-block" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
                            <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                              Commission Details :
                            </div>

                          </div>


                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: '#231F20' }} className="class-danger">
                              Payment Method
                            </label>
                            <select value={university?.paymentMethod} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select" name="paymentMethod" onChange={handleInputs}>
                              <option value="">Select Payment Type</option>
                              <option value="categorie1">Fixed</option>
                              <option value="categorie2">Percentage</option>
                            </select>
                            <br />
                            {university.paymentMethod === 'categorie1' ? (
                              <div className="form-group">
                                <label style={{ color: '#231F20' }} className="class-danger">Amount</label>

                                <input
                                  name="amount"
                                  className="form-control"
                                  type="text"
                                  placeholder='Enter Amount'
                                  value={university?.amount}
                                  style={{ height: 50 }}
                                  onChange={handleInputs}
                                />

                              </div>
                            ) : university.paymentMethod === 'categorie2' ? (
                              <div className="form-group">
                                <label style={{ color: '#231F20' }} className="class-danger">Percentage</label>

                                <input
                                  name="percentage"
                                  className="form-control"
                                  value={university?.percentage}
                                  type="text"
                                  placeholder='Enter Percentage'
                                  style={{ height: 50 }}
                                  onChange={handleInputs}
                                />

                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Eligibility for Commission<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              className="form-control "
                              placeholder="Enter Eligibility for Commission"
                              name="eligibilityForCommission"
                              value={university?.eligibilityForCommission}
                              onChange={handleInputs}
                            />
                            {errors.eligibilityForCommission.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Country<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select rounded-2 p-2 "
                              name="countryName"

                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              value={university?.countryName}
                              onChange={handleInputs}
                            > <option value={""} disabled hidden >{university?.countryName}</option>
                              {Object.keys(countryToDetails).map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>

                            {errors.countryName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Currency
                            </label>
                            <div sm="9" className="d-flex align-items-center">
                              {university.flag && (
                                <Flags code={university.flag} className="me-2" value={university.flag} style={{ width: '40px', height: '30px' }} onChange={handleInputs} name='flag' />
                              )}
                              <input className='form-control' type="text" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} onChange={handleInputs} name='currency' value={`${university.currency}`} readOnly />
                            </div>
                            {errors.currency.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Payment TAT<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              className="form-control "
                              value={university?.paymentTAT}
                              placeholder="Enter paymentTAT Link"
                              name="paymentTAT"
                              onChange={handleInputs}
                            />

                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Tax<span className="text-danger">*</span>
                            </label>
                            <select
                              className='form-select rounded-2 p-2 '
                              name="tax"
                              onChange={handleInputs}
                              value={university?.tax}
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <option value="">Select Tax</option>
                              {tax.map((data, index) =>
                                <option key={index} value={data?.tax}> {data?.tax}</option>)}
                            </select>
                            {errors.tax.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Commission PaidOn<span className="text-danger">*</span>
                            </label>
                            <select
                              className='form-select rounded-2 p-2 '
                              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              name="commissionPaidOn"
                              onChange={handleInputs}
                              value={university?.commissionPaidOn}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <option value="">Select Commission</option>
                              {commission.map((data, index) =>
                                <option key={index} value={data?.commissionPaidOn}>{data?.commissionPaidOn}</option>)}

                            </select>
                            {errors.commissionPaidOn.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                Admission Requirement <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Enter admission requirements"
                                value={university?.admissionRequirement}
                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                rows="5" // You can adjust the number of rows as needed
                                onChange={handleInputs}
                                name="admissionRequirement"
                              ></textarea>
                            </div>
                          </div>

                          <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                            <Link
                              style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}

                              to="/ListUniversity"
                              className="btn btn-cancel border text-white w-50 m-2"
                            >
                              Cancel
                            </Link>
                            <button
                              style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}

                              type="submit"
                              className="btn btn-save border text-white w-50 m-2"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default Profile;