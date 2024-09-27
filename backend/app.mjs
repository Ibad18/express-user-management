import express from 'express'
const app = express()
const users = [
    {id: 1, name: 'ibad', email:'ibad@gmail.com'},
    {id: 2, name: 'ibad2', email:'ibad2@gmail.com'},
    {id: 3, name: 'ibad3', email:'ibad3@gmail.com'}
]
app.get('/api/user', (req, res)=>{
    res.status(200).json({message:'fetching data', data: users})
})
app.post('/api/user', (req, res)=>{
    const userId = users.length+1
    const newUser = {
        id: userId,
        name: 'user'+userId,
        email: 'abc'+userId+'@gmail.com'
    }
    users.push(newUser)
    res.status(201).json({message:'fetching data', data: newUser})
})
app.put('/api/user/:id', (req,res)=>{
    const userId = parseInt(req.params.id)
    console.log(userId)
})

app.listen(5000, ()=>{
    console.log(`server is running on http://localhost:5000`)
})