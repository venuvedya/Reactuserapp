import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css'

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modifiedUser, setModifiedUser] = useState({});
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: ''
  });

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to search users
  const searchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users?search=${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  // Function to update user
  const updateUser = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, modifiedUser);
      // Update modified user in the local state
      setModifiedUser({});
      // Refetch users to update the UI
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to create new user
  const createUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/users', newUser); // Making a POST request to create a new user
      // Reset new user form fields
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        status: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: ''
      });
      // Refetch users to update the UI
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Function to delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      // Refetch users to update the UI
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>

      {/* Search form */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={searchUsers}>Search</button>
      </div>

      {/* Display users */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.address}</td>
              <td>
                {/* Modify user form */}
                <input
                  type="text"
                  value={modifiedUser[user.id] || ''}
                  onChange={(e) =>
                    setModifiedUser({
                      ...modifiedUser,
                      [user.id]: e.target.value
                    })
                  }
                />
                <button className="update-btn" onClick={() => updateUser(user.id)}>Update</button>
                {/* Delete user button */}
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create new user form */}
      <div className="create-user-form">
        <h2>Create New User</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newUser.phoneNumber}
          onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Date of Birth"
          value={newUser.dateOfBirth}
          onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
        <button className="create-btn" onClick={createUser}>Create User</button>
      </div>
    </div>
  
  );
};

export default UserManagement;
