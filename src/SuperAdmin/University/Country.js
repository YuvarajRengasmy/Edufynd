import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, getSingleApplication } from "../../api/applicatin";
import { toast } from "react-toastify";
import { getallUniversity } from "../../api/university";
import { getallProgram } from "../../api/Program";

function ApplicationForm() {
  const [track, setTrack] = useState({
    universityName: '',
    courseType: '',
    course: '',
    campus: '',
    inTake: '',
  });

  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const applicationId = location.state?.applicationId; // Assuming applicationId is passed via state

  // Fetch all universities and programs
  useEffect(() => {
    getAllUniversityList();
    getAllProgramList();
    if (applicationId) {
      fetchApplicationData();
    }
  }, [applicationId]);

  const fetchApplicationData = async () => {
    try {
      const res = await getSingleApplication(applicationId);
      const applicationData = res.data.result; // Adjust based on your API response structure
      setTrack(applicationData);
      setSelectedUniversity(applicationData.universityName);
      setSelectedCourseType(applicationData.courseType);
      setSelectedProgram(applicationData.course); // Assuming course is the program title
      setSelectedCampus(applicationData.campus);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getAllUniversityList = () => {
    getallUniversity()
      .then((res) => {
        setUniversities(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProgramList = () => {
    getallProgram()
      .then((res) => {
        setPrograms(res?.data?.result?.programList || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCourseTypeChange = (event) => {
    const selectedCourseType = event.target.value;
    setSelectedCourseType(selectedCourseType);

    const filteredUniversities = universities.filter((university) =>
      programs.some((prog) => prog.universityName === university.universityName && prog.courseType === selectedCourseType)
    );
    setFilteredUniversities(filteredUniversities);
    setSelectedUniversity('');
    setFilteredPrograms([]);
    setSelectedProgram(null);
    setSelectedCampus('');
    setTrack({
      ...track,
      courseType: selectedCourseType,
      universityName: '',
      course: '',
      campus: '',
      inTake: '',
    });
  };

  const handleUniversityChange = (event) => {
    const selectedUniversityName = event.target.value;
    setSelectedUniversity(selectedUniversityName);

    const filteredPrograms = programs.filter(
      (prog) =>
        prog.universityName === selectedUniversityName && prog.courseType === selectedCourseType
    );
    setFilteredPrograms(filteredPrograms);
    setSelectedProgram(null);
    setSelectedCampus('');
    setTrack({
      ...track,
      universityName: selectedUniversityName,
      course: '',
      campus: '',
      inTake: '',
    });
  };

  const handleProgramChange = (event) => {
    const selectedProgramTitle = event.target.value;
    const program = filteredPrograms.find((prog) => prog.programTitle === selectedProgramTitle);
    setSelectedProgram(program || null);
    setSelectedCampus('');
    setTrack({
      ...track,
      course: selectedProgramTitle,
      campus: '',
      inTake: '',
    });
  };

  const handleCampusChange = (event) => {
    const selectedCampus = event.target.value;
    setSelectedCampus(selectedCampus);

    const campusDetails = selectedProgram?.campuses?.find((campus) => campus.campus === selectedCampus);
    setTrack({
      ...track,
      campus: selectedCampus,
      inTake: campusDetails ? campusDetails.inTake : '',
    });
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

  const handleTrackSubmitted = (event) => {
    event.preventDefault();
    if (handleErrors(track)) {
      updateApplication(track)
        .then((res) => {
          toast.success("Successfully updated application status");
          navigate("/some-path"); // Redirect to another page after successful update
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <form onSubmit={handleTrackSubmitted}>
      <div className="row">
        {/* Course Type */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Course Type<span className="text-danger">*</span>
          </label>
          <select
            name="courseType"
            value={track.courseType}
            onChange={handleCourseTypeChange}
            className="form-select"
            style={{ fontSize: "12px" }}
          >
            <option value="">Select course type</option>
            {[...new Set(programs.map((prog) => prog.courseType))].map(
              (courseType, index) => (
                <option key={index} value={courseType}>
                  {courseType}
                </option>
              )
            )}
          </select>
        </div>

        {/* University Name */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            University Name<span className="text-danger">*</span>
          </label>
          <select
            name="universityName"
            value={track.universityName}
            onChange={handleUniversityChange}
            className="form-select"
            style={{ fontSize: "12px" }}
            disabled={!selectedCourseType}
          >
            <option value="">Select University</option>
            {filteredUniversities.map((uni) => (
              <option key={uni._id} value={uni.universityName}>
                {uni.universityName}
              </option>
            ))}
          </select>
        </div>

        {/* Program Title */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Program Title<span className="text-danger">*</span>
          </label>
          <select
            name="course"
            value={track.course}
            onChange={handleProgramChange}
            className="form-select"
            style={{ fontSize: "12px" }}
            disabled={!selectedUniversity}
          >
            <option value="">Select program</option>
            {filteredPrograms.map((prog) => (
              <option key={prog._id} value={prog.programTitle}>
                {prog.programTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Campus */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Campus<span className="text-danger">*</span>
          </label>
          <select
            className="form-select font-weight-light"
            name="campus"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
            value={track.campus}
            onChange={handleCampusChange}
            disabled={!selectedProgram}
          >
            <option value="">Select Campus</option>
            {selectedProgram?.campuses?.map((campus, index) => (
              <option key={index} value={campus.campus}>
                {campus.campus}
              </option>
            ))}
          </select>
        </div>

        {/* Intake */}
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
          <label className="form-label" style={{ color: "#231F20" }}>
            Intake<span className="text-danger">*</span>
          </label>
          <select
            className="form-select font-weight-light"
            name="inTake"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
            value={track.inTake}
            onChange={(e) => setTrack({ ...track, inTake: e.target.value })}
            disabled={!selectedCampus}
          >
            <option value="">Select Intake</option>
            {[...new Set(
              selectedProgram?.campuses?.filter(campus => campus.campus === selectedCampus)
              .map(campus => campus.inTake)
            )].map((uniqueIntake, index) => (
              <option key={index} value={uniqueIntake}>
                {uniqueIntake}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn px-4 py-2 text-uppercase fw-semibold"
            data-bs-dismiss="modal"
            style={{ fontSize: "12px", backgroundColor: "#231f20", color: "#fff" }}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn px-4 py-2 text-uppercase fw-semibold"
            style={{ fontSize: "12px", backgroundColor: "#fe5722", color: "#fff" }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default ApplicationForm;
