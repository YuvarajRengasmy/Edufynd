import React, { useState, useEffect } from 'react';

// Dummy function to mimic fetching students
const getallStudent = async () => {
  return {
    data: {
      result: [
        { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', image: 'john.jpg', dob: '2000-01-01', country: 'USA', mobileno: '1234567890' },
        // Add more students as needed
      ]
    }
  };
};

const YourComponent = () => {
  const [student, setStudent] = useState([]);
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAllStudentDetails();
  }, []);

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInput((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };

      if (name === "name") {
        const selectedStudent = student.find((u) => u.name === value);
        if (selectedStudent) {
          return {
            ...updatedProgram,
            studentId: selectedStudent._id,
            name: selectedStudent.name,
            email: selectedStudent.email,
            dob: selectedStudent.dob,
            country: selectedStudent.country,
            mobileno: selectedStudent.mobileno,
            whatsappno: selectedStudent.whatsappno
          };
        }
      }

      return updatedProgram;
    });

    if (submitted) {
      const newError = handleValidation({ ...input, [name]: value });
      setErrors(newError);
    }
  };

  const getAllStudentDetails = () => {
    getallStudent()
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (input) => {
    // Your validation logic here
    return {};
  };

  return (
    <div className="modal fade" id="SAProgramApply" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Apply Program</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row gy-3 gx-4 mb-3">
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Student Name</label>
                  <select
                    className="form-select rounded-1"
                    aria-label="Default select example"
                    style={{ fontSize: "12px" }}
                    onChange={handleInputs}
                    name="name"
                  >
                    <option value="">Open this select menu</option>
                    {student?.map((data, index) => (
                      <option key={index} value={data.name}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    value={input.dob || ''}
                    onChange={handleInputs}
                    className="form-control text-uppercase rounded-1"
                    style={{ fontSize: "12px" }}
                  />
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                  <label className="form-label">Student Id</label>
                  <input
                    type="text"
                    name="studentId"
                    value={input.studentId || ''}
                    onChange={handleInputs}
                    className="form-control rounded-1"
                    style={{ fontSize: "12px" }}
                  />
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={input.country || ''}
                    onChange={handleInputs}
                    className="form-control rounded-1"
                    style={{ fontSize: "12px" }}
                  />
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={input.email || ''}
                    onChange={handleInputs}
                    className="form-control rounded-1"
                    style={{ fontSize: "12px" }}
                  />
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">Primary No</label>
                  <input
                    type="number"
                    name="mobileno"
                    value={input.mobileno || ''}
                    onChange={handleInputs}
                    className="form-control rounded-1"
                    style={{ fontSize: "12px" }}
                  />
                </div>

                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label">WhatsApp No</label>
                  <input
                    type="number"
                    name="whatsappno"
                    value={input.whatsappno || ''}
                    onChange={handleInputs}
                    className="form-control rounded-1"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn px-4 py-2 text-uppercase border-0 rounded-1 fw-semibold"
              data-bs-dismiss="modal"
              style={{ fontSize: "12px", backgroundColor: "#231f20", color: "#fff" }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn px-4 py-2 text-uppercase border-0 rounded-1 fw-semibold"
              style={{ fontSize: "12px", backgroundColor: "#fe5722", color: "#fff" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
