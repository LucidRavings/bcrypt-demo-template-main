const express = require('express')
const cors = require('cors')

const app = express()

//middleware
app.use(express.json())
app.use(cors())

//endpoints (points of receving and redirecting)

const {createMessage} = require('./controller')

app.post('/api/messages', createMessage)



app.listen(4004, () => console.log('Server is listening on 4004'))