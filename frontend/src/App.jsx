import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user'

const App = () => {

  const [users, setUsers] = useState([])
  const [newUserName, setNewuserName] = useState('')
  const [newUserEmail, setNewuserEmail] = useState('')
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
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <h2>Express User Management</h2>
      <div>
        <h3>Add new user</h3>
        <input type='text' value={newUserName} onChange={(e) => setNewuserName(e.target.value)} placeholder='add a new user name' />
        <input type='text' value={newUserEmail} onChange={(e) => setNewuserEmail(e.target.value)} placeholder='add a new user email' />
        <button onClick={addUser}>Add</button>
      </div>
      <div>
        <input type='text' />
        <button>Update</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{users.map(user => (<li>{user.id}</li>))}</td>
            <td>{users.map(user => (<li>{user.name}</li>))}</td>
            <td>{users.map(user => (<li>{user.email}</li>))}</td>
          </tr>
        </tbody>
      </table>
      <ul>

      </ul>
    </>
  )
}

export default App