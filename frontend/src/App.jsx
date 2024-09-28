import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user'

const App = () => {

  const [users, setUsers] = useState([])
  const [newUserName, setNewuserName] = useState('')
  const [newUserEmail, setNewuserEmail] = useState('')
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' })

  async function fetchUser() {
    const response = await axios.get(API_URL)
    const content = response.data
    setUsers(content.data)
  }
  function addUser() {
    axios.post(API_URL, { name: newUserName, email: newUserEmail }).then(response => {
      setUsers([...users, response.data]);
      setNewuserName('')
      setNewuserEmail('')
      fetchUser()
    }).catch(err => console.error(err))
  }
  // update user
  function updateUserById(id) {
    axios.put(`${API_URL}/${id}`, { name: updateUser.name, email: updateUser.email })
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setUpdateUser({ id: '', name: '', email: '' })
        fetchUser()
      }).catch(err => console.error(err))
  }
    // Delete a user (DELETE)
    const deleteUserById = (id) => {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(err => console.error(err));
    };

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <h2>Express User Management</h2>
      <div>
        <h3>Add new user</h3>
        <input type='text' value={newUserName} onChange={(e) => setNewuserName(e.target.value)} placeholder='add a new user name' />
        <input type='email' value={newUserEmail} onChange={(e) => setNewuserEmail(e.target.value)} placeholder='add a new user email' />
        <button onClick={addUser}>Add</button>
      </div>
      <div>
        <input type='text' value={updateUser.name} onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })} />
        <input type='email' value={updateUser.email} onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} />
        <button onClick={() => updateUserById(updateUser.id)}>Update</button>
      </div>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}, {user.email}
            <button onClick={() => setUpdateUser({ id: user.id, name: user.name, email: user.email })}>
              Edit
            </button>
            <button onClick={() => deleteUserById(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App