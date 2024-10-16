import React, { useState } from "react";
import './App.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

function MaterialUITableWithAddUser() {
  const [open, setOpen] = useState(false); // Control dialog open/close
  const [selectedRow, setSelectedRow] = useState(null); // Store selected row data
  const [rows, setRows] = useState([ // Initial table data
    {id: 1, name: 'ibad', email:'ibad@gmail.com'},
    {id: 2, name: 'ibad2', email:'ibad2@gmail.com'},
    {id: 3, name: 'ibad3', email:'ibad3@gmail.com'}
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "" }); // Store new user data

  // Function to handle opening the dialog
  const handleClickOpen = (row = null) => {
    setSelectedRow(row); // Set the row data for edit if provided
    setOpen(true); // Open the dialog
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  // Function to handle adding a new user
  const handleAddUser = () => {
    setRows([...rows, { id: rows.length + 1, ...newUser }]); // Add new user to the table
    setNewUser({ name: "", email: "" }); // Reset new user fields
    handleClose(); // Close the dialog
  };

  return (
    <div className="container">
    <h1>User Management (Express)</h1>
      {/* Button to Add User */}
      <Button variant="contained" style={{float:"right", marginBottom:'10px'}} color="primary" onClick={() => handleClickOpen()}>
        Add User
      </Button>

      {/* Table to display data */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell style={{ width: 'auto' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell style={{ width: 'auto' }}>
                  <Button variant="contained" color="primary" onClick={() => handleClickOpen(row)}>
                    Edit
                  </Button>
                  <Button variant="contained" style={{backgroundColor: "red", width:'auto', marginLeft: "10px" }} onClick={() => handleClickOpen(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog component for Add/Edit User */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedRow ? `Edit ${selectedRow.name}` : "Add User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedRow
              ? `Edit details for ${selectedRow.name}`
              : "Please enter details to add a new user."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={selectedRow ? selectedRow.name : newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={selectedRow ? selectedRow.email : newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={selectedRow ? handleClose : handleAddUser} color="primary">
            {selectedRow ? "Save" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MaterialUITableWithAddUser;
