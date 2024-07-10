import React, { useEffect, useState } from 'react';
import Flags from 'react-world-flags';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveProgram } from '../../api/Program';
import { getallUniversity } from '../../api/university';
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import { Form, Row, Col } from 'react-bootstrap';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from 'react-select';




function Profile() {

  const initialState = {
    universityName: "",
   
    inTake: "",
  
   
    campus: "",
    courseFee: 0,
    duration: "",
   
  
  }

  const initialStateErrors = {
    universityName: { required: false },
   
    inTake: { required: false },
    courseType: { required: false },

 
    campus: { required: false },
    courseFee: { required: false },
    duration: { required: false },
   


  }
  const [program, setProgram] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const [university, setUniversity] = useState([]);
  const [selectedIntake, setSelectedIntake] = useState([]);

  const [campuses, setCampuses] = useState([{ id: 1, fields: { ...initialState } }]);

  const [selectedCampuses, setSelectedCampuses] = useState();


  const [intake, setIntake] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
 
    getAllIntakeDetails();
  }, [])

  const getAllUniversityList = () => {
    getallUniversity().then(res => {
      setUniversity(res?.data?.result)
    }).catch(err => { console.log(err) })
  }



 
  const getAllIntakeDetails = () => {
    getallIntake()
      .then((res) => {
        setIntake(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.universityName === "") {
      error.universityName.required = true;
    }
 
    // if (data.courseType === "") {
    //   error.courseType.required = true;
    // }
   
    // if (data.inTake === "") {
    //   error.inTake.required = true;
    // }
    
    // if (data.campus === "") {
    //   error.campus.required = true;
    // }

    if (data.courseFee === "") {
      error.courseFee.required = true;
    }
    if (data.duration === "") {
      error.duration.required = true;
    }
   
    return error
  }


  const handleSelectChange = (selectedOptions) => {
    setSelectedCampuses(selectedOptions);
  };

  const handleSelectIntake = (selectedOptions) => {
    setSelectedIntake(selectedOptions)

  };

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };

    

      if (name === "universityName") {
        const selectedUniversity = university.find(u => u.universityName === value);
        if (selectedUniversity) {
          return {
            ...updatedProgram,
            universityId: selectedUniversity._id,
            universityLogo: selectedUniversity.universityLogo,
            state: selectedUniversity.state,
            lga: selectedUniversity.lga,
            courseType: selectedUniversity.courseType, // assuming 'popularCategories' is a single value

            country: selectedUniversity.country, // if country is a field in university data
          };
        }
      }


      return updatedProgram;
    });

    if (submitted) {
      const newError = handleValidation({ ...program, [name]: value });
      setErrors(newError);
    }
  };


  const addCampus = () => {
    setCampuses([...campuses, { id: campuses.length + 1, fields: { ...initialState } }]);
  };
  const campusOptions = program?.state ? program.state.map(state => ({ value: state, label: state })) : [];
  const lgaOptions = program?.lga && program.lga.length > 0 ? program.lga.map(lga => ({ value: lga, label: lga })) : [];



  const courseTypeOptions = program?.courseType ? program.courseType.map(courseType => ({ value: courseType, label: courseType })) : [];
  // const courseTypeOptions = type.map((data) => ({ value: data.courseType, label: data.courseType }));
  const inTakeOptions = intake.map((data) => ({ value: data.intakeName, label: data.intakeName }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(program);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveProgram({
        ...program,
        campus: selectedCampuses ? selectedCampuses.map(option => option.value) : [],
        // courseType: selectedCourseType ? selectedCourseType.map(option => option.value) : [],
        inTake: selectedIntake ? selectedIntake.map(option => option.value) : [],
      })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Programs");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };


  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />

        </nav>

        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header ">
            <div className="content container-fluid">
              <form onSubmit={handleSubmit} >
                <div className='row'>
                  <div className="col-xl-12 ">
                    <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                        <h5 className='text-center text-capitalize p-1'> Add Program Details</h5>
                      </div>
                      <div className="card-body mt-5">

                        <div className="row g-3">

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              {" "}
                              University Name<span className="text-danger">*</span>
                            </label>
                            <select onChange={handleInputs} value={program?.universityName ?? ""} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select rounded-2 p-2 " name='universityName'>
                              <option value={""} disabled hidden style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} >Select University</option>
                              {university.map((data, index) =>
                                <option key={index} value={data?.universityName} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}> {data?.universityName}</option>)}
                            </select>
                            {errors.universityName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}

                          </div>
                       
                       

                      

                         

                     










                         
                          {campuses.map((campus, index) => (
        <div className='row g-3' key={index}>
          <h5>Campus {campus?.campus}</h5>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Campus
                            </label>


                            <Select
                              isMulti
                              value={selectedCampuses}
                              options={lgaOptions.length > 0 ? lgaOptions : campusOptions}
                              placeholder="Select Campus"
                              name="campus"
                              onChange={handleSelectChange}
                              styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                            />

                            {errors.campus.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Course Fees <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              className="form-control"
                              placeholder="Enter courseFees"
                              name="courseFee"
                              onChange={handleInputs}
                            />
                            {
                              errors.courseFee.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }

                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              InTake<span className="text-danger">*</span>
                            </label>

                            <Select
                              isMulti
                              value={selectedIntake}
                              options={inTakeOptions}
                              placeholder="Select InTake"
                              name="inTake"
                              onChange={handleSelectIntake}
                              styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                            />
                            {errors.inTake.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                            <label style={{ color: "#231F20" }}>
                              Duration <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              className="form-control"
                              placeholder="Enter duration"
                              name="duration"
                              onChange={handleInputs}
                            />

                            {
                              errors.duration.required ? <div className="text-danger form-text">This field is required.</div> : null
                            }

                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mt-5">
                          <label className='visually-hidden' style={{ color: "#231F20" }}>
                              Duration <span className="text-danger">*</span>
                            </label>
                          <a type="button" className='btn btn-primary ' onClick={addCampus}>
        Add Campus
      </a>


</div>
                          </div>
                        ))}
                       
                      

                         







                          <div className='row g-2'>
                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                              <Link

                                to="/ListUniversity"
                                style={{ backgroundColor: '#231F20', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
                              >
                                Cancel
                              </Link>
                              <button

                                style={{ backgroundColor: '#FE5722', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}

                                type="submit"
                                className="btn btn-save border-0 fw-semibold text-uppercase  px-4 py-2 text-white m-2"
                              >
                                Submit
                              </button>
                            </div>


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
    </div>
  );
}
export default Profile;
