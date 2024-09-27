import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
const users = [
    {id: 1, name: 'ibad', email:'ibad@gmail.com'},
    {id: 2, name: 'ibad2', email:'ibad2@gmail.com'},
    {id: 3, name: 'ibad3', email:'ibad3@gmail.com'}
]

function errorHandler(err, req, res, next){
    res.status(err.status || 500).json({
        message: err.message || 'something went wrong',
        error: true
    })
}

app.get('/api/user', (req, res)=>{
    res.status(200).json({message:'fetching data', data: users})
})
app.post('/api/user', (req, res)=>{
    const body = req.body;
    // const newUserId = users.length+1
    const newUser = {
        id: users.length+1,
        ...body
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