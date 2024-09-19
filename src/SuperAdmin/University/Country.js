import React, { useEffect, useState } from 'react';
import {
  getallUniversity,
  deleteUniversity,
  saveUniversity,
  getAllUniversit,
  getFilterUniversity,
  updateUniversity,
  
} from "../../api/university";
const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [statuses, setStatuses] = useState({}); // To store the switch status of universities

  // Fetch all universities on component mount
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await getallUniversity();
        const universityData = Array.isArray(response.data) ? response.data : [];

        // Initialize the statuses based on the fetched university data
        const initialStatuses = universityData.reduce((acc, university) => {
          return { ...acc, [university.id]: university.universityStatus === 'Active' };
        }, {});

        setUniversities(universityData); // Set universities data
        setStatuses(initialStatuses); // Set initial statuses
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversity();
  }, []); // Run only once on component mount

  // Toggle university status
  const handleCheckboxChanges = async (id, currentStatus) => {
    const updatedStatus = currentStatus ? 'Inactive' : 'Active';

    // Update the local state immediately for a quick UI response
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: !prevStatuses[id],
    }));

    // Prepare the university data to send to the backend
    const updateData = {
      _id: id,
      universityStatus: updatedStatus, // Update the status based on toggle
    };

    try {
      await updateUniversity(updateData); // Send update to the backend
      console.log(`University ${id} status updated to ${updatedStatus}`);
    } catch (error) {
      console.error('Error updating University status:', error);

      // Revert the status if there's an error during the update
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: !prevStatuses[id], // Revert the change
      }));
    }
  };

  return (
    <div>
      <h3>University List</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>University Name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {universities?.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.location}</td>
              <td className="text-capitalize text-start">
                <span className="form-check form-switch d-inline ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`flexSwitchCheckDefault1${index}`}
                    checked={statuses[data.id] || false}
                    onChange={() => handleCheckboxChanges(data.id, statuses[data.id])}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexSwitchCheckDefault1${index}`}
                  >
                    {statuses[data.id] ? 'Active' : 'Inactive'}
                  </label>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityList;
