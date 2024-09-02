// import React, { useState, useEffect } from 'react';
// import { getallStaff } from "../../api/staff";

// import axios from 'axios';

// const PermissionManagementPage = () => {

//     const [staffList, setStaffList] = useState([]);
//     const [selectedStaffId, setSelectedStaffId] = useState(null);
//     const [permissions, setPermissions] = useState({});

//     const sidebarItems = [
//         { name: 'Dashboard', path: '/dashboard' },
//         { name: 'Client', path: '/list_client' },
//         { name: 'University', path: '/list_university' },
//         { name: 'Testimonials', path: '/list_testimonials' },
//         { name: 'Admin', path: '/list_admin' },
//     ];
    
//     useEffect(() => {
//         getStaffList();  
//       }, [selectedStaffId]);

//       const getStaffList = () => {
//         getallStaff()
//           .then((res) => {
//             setStaffList(res?.data?.result || []);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };
//     const roles = ['staff', 'student']; // Example roles
//     useEffect(() => {
        
//         axios.get('/api/staff').then(response => {
//             setStaffList(response.data);
//         });

//         if (selectedStaffId) {
//             axios.get(`/api/permissions/${selectedStaffId}`).then(response => {
//                 setPermissions(response.data);
//             });
//         }
//     }, [selectedStaffId]);

//     const handlePermissionChange = (itemName) => {
//         setPermissions((prevPermissions) => ({
//             ...prevPermissions,
//             [itemName]: !prevPermissions[itemName],
//         }));
//     };

//     const savePermissions = () => {
//         axios.post(`/api/permissions/${selectedStaffId}`, permissions)
//             .then(() => {
//                 alert('Permissions saved successfully!');
//             });
//     };

//     return (
//         <div>
//             <h2>Manage Staff Permissions</h2>
//             <select onChange={(e) => setSelectedStaffId(e.target.value)} value={selectedStaffId}>
//                 <option value="">Select Staff</option>
//                 {staffList.map(staff => (
//                     <option key={staff.id} value={staff.id}>{staff.empName}</option>
//                 ))}
//             </select>

//             {selectedStaffId && (
//                 <div>
//                     <h3>Permissions for {staffList.find(staff => staff.id === selectedStaffId)?.empName}</h3>
//                     {sidebarItems.map(item => (
//                         <div key={item.name}>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     checked={permissions[item.name] || false}
//                                     onChange={() => handlePermissionChange(item.name)}
//                                 />
//                                 {item.name}
//                             </label>
//                         </div>
//                     ))}
//                     <button onClick={savePermissions}>Save Permissions</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PermissionManagementPage;
