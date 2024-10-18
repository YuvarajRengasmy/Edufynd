import React, { useEffect, useState } from 'react';

export const AddRecieverInvoice = () => {
  const initialState = {
    agentName: "",
    applicationCode: "",
    course: "",
    courseFeesAmount: "",
  };

  const [invoice, setInvoice] = useState(initialState);
  const [senderList, setSenderList] = useState([]); // Holds all sender data
  const [selectedAgentApplications, setSelectedAgentApplications] = useState([]); // Holds applications for the selected agent

  useEffect(() => {
    getAllApplicationList();
  }, []);

  const getAllApplicationList = () => {
    // Simulate fetching data (Replace this with actual API call)
    const data = [
      {
        agentName: "Agent1",
        application: [
          { applicationCode: "APP001", course: "Course1", courseFeesAmount: 1000 },
          { applicationCode: "APP002", course: "Course2", courseFeesAmount: 1500 }
        ]
      },
      {
        agentName: "Agent2",
        application: [
          { applicationCode: "APP003", course: "Course3", courseFeesAmount: 1200 },
          { applicationCode: "APP004", course: "Course4", courseFeesAmount: 1800 }
        ]
      }
    ];
    setSenderList(data); // Store the fetched data
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));

    if (name === "agentName") {
      // Find selected agent's applications and store in selectedAgentApplications
      const selectedAgent = senderList.find((agent) => agent.agentName === value);
      setSelectedAgentApplications(selectedAgent ? selectedAgent.application : []);
    }
  };

  return (
    <div>
      <div className='row mt-3'>
        {/* Agent Selection */}
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
          <label className="form-label">Agent Name</label>
          <select
            className='form-select'
            aria-label='Default select example'
            name="agentName"
            onChange={handleInputs}
            value={invoice.agentName}
          >
            <option>Select Agent Name</option>
            {senderList.map((sender, index) => (
              <option
                key={index}
                value={sender.agentName}
                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              >
                {sender.agentName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Applications of the selected Agent */}
      {selectedAgentApplications.length > 0 && selectedAgentApplications.map((app, index) => (
        <div key={index} className="row mt-3">
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label">Application Code</label>
            <input
              className="form-control"
              type="text"
              name="applicationCode"
              value={app.applicationCode}
              readOnly
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label">Course Name</label>
            <input
              className="form-control"
              type="text"
              name="course"
              value={app.course}
              readOnly
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label">Course Fees Amount</label>
            <input
              className="form-control"
              type="number"
              name="courseFeesAmount"
              value={app.courseFeesAmount}
              readOnly
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddRecieverInvoice;
