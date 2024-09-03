import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivilegeManager = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [privileges, setPrivileges] = useState([]);

    useEffect(() => {
        // Fetch users
        axios.get('/api/users').then(response => setUsers(response.data));
    }, []);

    const handlePrivilegeChange = (module, permissionType) => {
        setPrivileges(prev => prev.map(p => 
            p.module === module ? { ...p, permissions: { ...p.permissions, [permissionType]: !p.permissions[permissionType] } } : p
        ));
    };

    const savePrivileges = () => {
        axios.post('/api/users/assign-privileges', { userId: selectedUser, privileges })
            .then(response => alert('Privileges assigned successfully'))
            .catch(error => console.error('Error assigning privileges', error));
    };

    return (
        <div>
            <h2>Privilege Manager</h2>
            <select onChange={(e) => setSelectedUser(e.target.value)}>
                <option>Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <div>
                <h3>Manage Privileges</h3>
                {['university', 'program', 'client'].map(module => (
                    <div key={module}>
                        <h4>{module}</h4>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.add || false}
                                onChange={() => handlePrivilegeChange(module, 'add')}
                            />
                            Add
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.edit || false}
                                onChange={() => handlePrivilegeChange(module, 'edit')}
                            />
                            Edit
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.view || false}
                                onChange={() => handlePrivilegeChange(module, 'view')}
                            />
                            View
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.delete || false}
                                onChange={() => handlePrivilegeChange(module, 'delete')}
                            />
                            Delete
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={savePrivileges}>Save Privileges</button>
        </div>
    );
};

export default PrivilegeManager;
