import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
                <p className="mb-1">Username: {selectedUser.username}</p>
                <p className="mb-1">Email: {selectedUser.email}</p>
                {showMoreInfo && (
                  <>
                    <p className="mb-1">Phone: {selectedUser.phone}</p>
                    <p className="mb-1">Website: {selectedUser.website}</p>
                    <h3>Address:</h3>
                    <p className="mb-1">
                      Street: {selectedUser.address.street}
                    </p>
                    <p className="mb-1">Suite: {selectedUser.address.suite}</p>
                    <p className="mb-1">City: {selectedUser.address.city}</p>
                    <p className="mb-1">
                      Zipcode: {selectedUser.address.zipcode}
                    </p>
                    <h3>Company:</h3>
                    <p className="mb-1">Name: {selectedUser.company.name}</p>
                    <p className="mb-1">
                      Catchphrase: {selectedUser.company.catchPhrase}
                    </p>
                    <p className="mb-1">BS: {selectedUser.company.bs}</p>
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
