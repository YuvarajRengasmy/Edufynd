import { useState, useEffect } from 'react';
import { getStaffId } from "../../Utils/storage"; // Make sure this is returning valid data
import { getSingleStaff } from "../../api/staff"; // Ensure this API call works correctly

const SidebarComponent = () => {
  const [privileges, setPrivileges] = useState([]); // Start with an empty privileges array
  const [loading, setLoading] = useState(true);     // Add loading state
  const [error, setError] = useState(null);         // Add error state

  // Fetch staff details and privileges on component mount
  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = async () => {
    const id = getStaffId(); // Assuming getStaffId is valid and returns a valid staff ID
    if (!id) {
      setError("Staff ID not found");
      setLoading(false);
      return;
    }

    try {
      const res = await getSingleStaff(id); // Assuming getSingleStaff is a valid API call
      console.log("Fetched Staff Data:", res);

      if (res?.data?.result?.privileges) {
        setPrivileges(res.data.result); // Set the privileges
      } else {
        setPrivileges({ privileges: [] }); // If no privileges, set to an empty array
      }

      setLoading(false); // After fetching, set loading to false
    } catch (err) {
      console.error("Error fetching staff data:", err);
      setError("Failed to fetch staff details");
      setLoading(false); // Stop loading in case of error
    }
  };

  // Privilege data should be in the format of: privileges.privileges = [{ module: 'client' }, { module: 'university' }, { module: 'program' }, { module: 'commission' }]
  const privilegeArray = privileges?.privileges || [];

  // Function to check if the user has a particular module access
  const hasPrivilege = (moduleName) => {
    return privilegeArray.find((privilege) => privilege.module === moduleName);
  };

  // If loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="sidebar">
      <ul>
        {/* Example sidebar links */}
        {hasPrivilege('client') && (
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        )}

        {hasPrivilege('university') && (
          <li>
            <a href="/students">Students</a>
          </li>
        )}

        {hasPrivilege('program') && (
          <li>
            <a href="/settings">Settings</a>
          </li>
        )}

        {hasPrivilege('commission') && (
          <li>
            <a href="/reports">Reports</a>
          </li>
        )}

        {/* Add other sidebar modules conditionally */}
        <h1>Country</h1>
        {/* Continue adding items based on privileges */}
      </ul>
    </div>
  );
};

export default SidebarComponent;
