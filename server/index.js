express = require('express')
//index.js is inside server.js so we need to go up one level
users = require('../users.json')

const port = 4042
app = express()

app.use(express.json())

app.get('/api/users', (req, res) => {
    console.log(req)
    res.status(200).send(users)
})

app.get('/api/users/:id', (req, res) => {
    const {id} = req.params


    //this id catch won't fire
    if (!id) {
        return res.status(404).send("Unable to find resource")
    }

    const user = users.find(user => user.id === +id)
    
    if (!user) res.status(500).send("Unable to find user")

    res.status(200).send(user)
})

app.listen(port, () => console.log(`Server running on ${port}`))