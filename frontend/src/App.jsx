import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./App.css"; // Custom CSS for layout

const App = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState({ id: null, name: "", email: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((user) => {
        setUsers([...users, user]);
        setOpen(false);
        setNewUser({ name: "", email: "" });
      });
  };

  const handleEditUser = () => {
    fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingUser.name, email: editingUser.email }),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditOpen(false);
      });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      }).then(() => {
        setUsers(users.filter((user) => user.id !== id));
      });
    }
  };

  return (
    <div className="app-container">
      <h2>User Management System (Express)</h2>
      {/* Add User Button */}
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add User
        </Button>
      </div>

      {/* Table to Display Users */}
      <TableContainer component={Paper} style={{ width: "40%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }}>ID</TableCell>
              <TableCell style={{ width: "auto" }}>Name</TableCell>
              <TableCell style={{ width: "auto" }}>Email</TableCell>
              <TableCell style={{ width: "auto" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditingUser(user);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditUser} color="primary">
            Update User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
