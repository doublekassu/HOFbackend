//Tietokantaan yhdistäminen sekä giveawaySchema
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const giveawaySchema = new mongoose.Schema({
    content: String,
    organizer: String,
    link: String,
    imgid: String
})



module.exports = mongoose.model('Giveaway', giveawaySchema)