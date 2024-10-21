import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveApplication, getSingleApplication } from "../../api/applicatin";
import { toast } from "react-toastify";
import { getallUniversity } from "../../api/university";
import { getallProgram } from "../../api/Program";
import {getFilterApplicationStatus} from "../../api/universityModule/ApplicationStatus";
import {  getSingleAgent } from "../../api/agent";
import {getAgentId } from "../../Utils/storage";
function ApplicationForm() {
  const initialStateInputs = {
   
    uniCountry: "",
    inTake: "",

    universityName: "",
    programTitle: "",
    campus: "",
    courseFees: "",
    courseType: "",
  };

  const [application, setApplication] = useState(initialStateInputs);
  const [inputs, setInputs] = useState({});
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [status, setStatus] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [staff ,setStaff] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    getAllUniversityList();
    getAllProgramList();
    getStaffDetail();
    getAllApplicationsModuleDetails();
    if (id) {
      fetchApplicationData();
    }
  }, [id]);


  const getAllApplicationsModuleDetails = () => {
    const data = {
      limit: 10,
    
    };
    getFilterApplicationStatus(data)
      .then((res) => {
        console.log("ggg", res)
        setStatus(res?.data?.result?.statusList || []);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStaffDetail = () => {
    const id = getAgentId();
    getSingleAgent(id)
      .then((res) => {
        setStaff(res?.data?.result); // Assuming the staff data is inside res.data.result
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchApplicationData = async () => {
    try {
      const res = await getSingleApplication(id);
      console.log("yyyuryuryui", res);
      const applicationData = res.data.result;
      setInputs(applicationData);
      setSelectedCourseType(applicationData.courseType);
      setSelectedProgram(applicationData.programTitle);
      setSelectedCampus(applicationData.campus);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  const handleInputs = (event) => {
  
    const { name, value } = event.target;
    setApplication((prevInputs) => ({ ...prevInputs, [name]: value }));
 
    
  };
  const getAllUniversityList = async () => {
    try {
      const res = await getallUniversity();
      setUniversities(res.data.result);
    } catch (err) {
      toast.error("Failed to fetch universities");
    }
  };

  const getAllProgramList = async () => {
    try {
      const res = await getallProgram();
      setPrograms(res.data.result.programList || []);
    } catch (err) {
      toast.error("Failed to fetch programs");
    }
  };

  const handleCourseTypeChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCourseType(selectedCountry);

    const filteredUniversities = universities.filter((university) =>
      programs.some(
        (prog) =>
          prog.universityName === university.universityName &&
          prog.country === selectedCountry
      )
    );
    setFilteredUniversities(filteredUniversities);
    setApplication({
      ...application,
      uniCountry: selectedCountry,
      universityName: "",
      courseType: "",
      course: "",
      campus: "",
      inTake: "",
    });
    setFilteredPrograms([]);
    setSelectedProgram(null);
    setSelectedCourse("");
    setSelectedCampus("");
  };

  const handleUniversityChange = (event) => {
    const selectedUniversityName = event.target.value;
    const filteredPrograms = programs.filter(
      (prog) =>
        prog.universityName === selectedUniversityName &&
        prog.country === selectedCourseType
        
    );
    setFilteredPrograms(filteredPrograms);
    setApplication({
      ...application,
      universityName: selectedUniversityName,
      courseType: "",
      course: "",
      campus: "",
      inTake: "",
    });
    setSelectedCourse("");
    setSelectedProgram(null);
    setSelectedCampus("");
  };

  const handleCourse = (event) => {
    const selectedCourse = event.target.value;
    const program = filteredPrograms.find(
      (prog) => prog.courseType === selectedCourse
    );
    setApplication({
      ...application,
      courseType: selectedCourse,
      course: "",
      campus: "",
      inTake: "",
    });
    setSelectedProgram(program);
    setSelectedCampus("");
  };
  const handleProgramChange = (event) => {
    const selectedProgramTitle = event.target.value;
    const program = filteredPrograms.find(
      (prog) => prog.programTitle === selectedProgramTitle
    );
    setApplication({
      ...application,
      course: selectedProgramTitle,
      applicationFee: program ? program.applicationFee:"",
      campus: "",
      inTake: "",
    });
    setSelectedProgram(program);
    setSelectedCampus("");
  };

  const handleCampusChange = (event) => {
    const selectedCampus = event.target.value;
    const campusDetails = selectedProgram?.campuses?.find(
      (campus) => campus.campus === selectedCampus
    );
    setApplication({
      ...application,
      campus: selectedCampus,
      inTake: campusDetails ? campusDetails.inTake : "",
      courseFees: campusDetails ? campusDetails.courseFees : '',

    });
    setSelectedCampus(selectedCampus);
  };
  const [open, setOpen] = useState(false);

  const closePopup = () => {
    setOpen(false);
  };
  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };
const handleapplicationSubmitted = (event) => {
  event.preventDefault();
  if (handleErrors(application)) {
    const data = {
      ...application,
      agentId:staff._id,
      agentName:staff.agentName,
      agentsCommission:staff.agentsCommission,
      status: status,
      name: inputs.name,
      dob: inputs.dob,
      passportNo: inputs.passportNo,
      studentId: inputs.studentId,
      country: inputs.country,
      email: inputs.email,
      primaryNumber: inputs.primaryNumber,
      whatsAppNumber: inputs.whatsAppNumber,
      studentCode: inputs.studentCode,
      applicationFee: selectedProgram?.applicationFee,
    };
    saveApplication(data)
      .then((res) => {
        toast.success("Successfully updated application status");
        closePopup();
        navigate("/agent_list_program"); // Redirect to another page after successful update
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  }
};

  return (
<div>
    <button
    className="btn btn-outline-dark text-uppercase fw-semibold px-3 py-1 text-center rounded-1"
    data-bs-toggle="modal"
    data-bs-target="#StatusModal34" // Updated target to match the modal ID
  >
    <i className="fa fa-plus me-2" aria-hidden="true"></i>
  New Application
  </button>
    <div
      className="modal fade"
      id="StatusModal34"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel21"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel21">
              Add Application
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleapplicationSubmitted}>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select"
                    value={application.uniCountry}
                    name="uniCountry"
                    onChange={handleCourseTypeChange}
                  >
                    <option value="">Select course type</option>
                    {[...new Set(programs.map((prog) => prog.country))].map(
                      (country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <label className="form-label">University Name</label>
                  <select
                    className="form-select"
                    value={application.universityName}
                    onChange={handleUniversityChange}
                    disabled={!selectedCourseType}
                  >
                    <option value="">Select university</option>
                    {filteredUniversities.map((uni) => (
                      <option key={uni._id} value={uni.universityName}>
                        {uni.universityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <label className="form-label">courseType</label>
                  <select
                    className="form-select"
                    value={application.courseType}
                    onChange={handleCourse}
                    name="courseType"
                    disabled={!application.universityName}
                  >
                    <option value="">Select program</option>
                    {[...new Set(filteredPrograms.map((prog) => prog.courseType))].map(
                      (courseType, index) => (
                        <option key={index} value={courseType}>
                          {courseType}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Program Title</label>
                  <select
                    className="form-select"
                    value={application.course}
                    name="course"
                    onChange={handleProgramChange}
                    disabled={!application.universityName}
                  >
                    <option value="">Select program</option>
                    {filteredPrograms.map((prog) => (
                      <option key={prog._id} value={prog.programTitle}>
                        {prog.programTitle}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Campus</label>
                  <select
                    className="form-select"
                    value={application.campus}
                    onChange={handleCampusChange}
                    disabled={!selectedProgram}
                  >
                    <option value="">Select campus</option>
                    {selectedProgram?.campuses?.map((campus, index) => (
                      <option key={index} value={campus.campus}>
                        {campus.campus}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Intake</label>
                  <input
                    type="text"
                    className="form-control"
                    value={application.inTake}
                    onChange={(e) =>
                      setApplication({ ...application, inTake: e.target.value })
                    }
                    disabled={!selectedCampus}
                  />
                </div>
                <div className="col-lg-6 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
          courseFees<span className="text-danger">*</span>
          </label>
          <select
            className="form-select font-weight-light"
            name="courseFees"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
            value={application.courseFees}
            onChange={(e) => setApplication({ ...application, courseFees: e.target.value })}
            disabled={!selectedCampus}
          >
            <option value="">Select courseFees</option>
            {[...new Set(
              selectedProgram?.campuses?.filter(campus => campus.campus === selectedCampus)
              .map(campus => campus.courseFees)
            )].map((uniqueIntake, index) => (
              <option key={index} value={uniqueIntake}>
                {uniqueIntake}
              </option>
            ))}
          </select>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden ">
                            <label style={{ color: "#231F20" }}>
                              application Name
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              value={application?.name}
                              className="form-control rounded-1 p-2"
                              placeholder="Enter Name"
                              onChange={handleInputs}
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="name"
                            />
                           
                          </div>
                          
                         
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ApplicationForm;
