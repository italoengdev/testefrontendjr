import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding
} from 'react-icons/fa'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  function handleUserClick(user) {
    setSelectedUser(user)
    setShowMoreInfo(false)
  }

  function toggleShowMoreInfo() {
    setShowMoreInfo(!showMoreInfo)
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Users</h1>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group" style={{ cursor: 'pointer' }}>
            {users.map(user => (
              <li
                key={user.id}
                className={`list-group-item ${
                  selectedUser && user.id === selectedUser.id ? 'active' : ''
                }`}
                onClick={() => handleUserClick(user)}
              >
                Username: {user.username} - From: {user.address.city}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {selectedUser && (
            <div className="card">
              <div className="card-body">
                <h2>{selectedUser.name}</h2>
                <p className="mb-1">
                  <FaEnvelope className="d-inline mx-1" />
                  {selectedUser.email}
                </p>
                <p className="mb-1">
                  <FaPhone className="d-inline mx-1" />
                  {selectedUser.phone}
                </p>
                <p className="mb-1">
                  <FaGlobe className="d-inline mx-1" />
                  {selectedUser.website}
                </p>
                {showMoreInfo && (
                  <>
                    <h3>Address:</h3>
                    <p className="mb-1">
                      <FaMapMarkerAlt className="d-inline mx-1" />
                      {selectedUser.address.street},{' '}
                      {selectedUser.address.suite}, {selectedUser.address.city},{' '}
                      {selectedUser.address.zipcode}
                    </p>
                    <h3>Company:</h3>
                    <p className="mb-1">
                      <FaBuilding className="d-inline mx-1" />
                      {selectedUser.company.name},{' '}
                      {selectedUser.company.catchPhrase},{' '}
                      {selectedUser.company.bs}
                    </p>
                  </>
                )}
                <button
                  className="btn btn-secondary mt-3"
                  onClick={toggleShowMoreInfo}
                >
                  {showMoreInfo ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UsersPage
