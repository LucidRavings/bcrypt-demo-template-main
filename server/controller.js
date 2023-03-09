const bcrypt = require('bcryptjs')
let chats = []

module.exports = {
    createMessage: (req, res) => {
        // console.log(req.body)
        const {pin, message} = req.body

        // console.log(pin)
        // console.log(message)

        for(let i = 0; i < chats.length; i++){
            const exsistingPin = bcrypt.compareSync(pin, chats[i].pinHash) //gives a boolean of true/false
            if(exsistingPin){
                chats[i].messages.push(message) //adding message to the object that shares the same pin
                let messageToReturn = {...chats[i]}
                delete messageToReturn.pinHash
                return res.status(200).send(messageToReturn)
            }
        }

        let salt = bcrypt.genSaltSync(5)
        let pinHash = bcrypt.hashSync(pin, salt)

        // console.log(pin)
        // console.log(salt)
        // console.log(pinHash)

        let msgObj = {
            pinHash,
            messages: [message]
        }

        chats.push(msgObj)
        // console.log(chats)

let secureMessage = {...msgObj} //Creates a copy of msgObj and saves to new variable
delete secureMessage.pinHash //removes the pinHash from the secureMessage object

        res.status(200).send(secureMessage)
    }
}