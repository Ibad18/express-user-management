import React from 'react'

const App = () => {
  return (
    <>
      <h2>Express User Management</h2>
      <div>
        <input type='text' placeholder='add a new user' />
        <button>Add</button>
      </div>
      <div>
        <input type='text'/>
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
            <td>1</td>
            <td>abc</td>
            <td>abc@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default App