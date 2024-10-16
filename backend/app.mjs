import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

let users = [
    {id: 1, name: 'ibad', email:'ibad@gmail.com'},
    {id: 2, name: 'ibad2', email:'ibad2@gmail.com'},
    {id: 3, name: 'ibad3', email:'ibad3@gmail.com'}
];

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Add a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.json(newUser);
});

// Edit an existing user
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], name, email };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id));
  res.json({ message: "User deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;