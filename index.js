require('dotenv').config()
//Kirjasto, jolla ohjelmoida Node-backendisiä web-sovelluksi
const express = require('express')
const cors = require('cors')
const Giveaway = require('./models/databaseconnection')
const app = express()


//Jotta frontend ja backend voivat kommunikoida keskenään eri porteilla
app.use(cors())


//json parser (tarvitsee datan lisäämiseen app.postissa)
app.use(express.json())
app.use(express.static('dist'))

//Haetaan kaikki arvonnat
app.get('/api/giveaways', (request, response) => {
    Giveaway.find({}).then(notes => {
        response.json(notes)
    })
})

//Haetaan yksittäinen arvonnat sen id:n perusteella
app.get('/api/giveaways/:id', (request, response) => {
    const id = request.params.id
    Giveaway.findById(id).then(giveaway => {
        response.json(giveaway)
    })
})

//Yksittäisen arvonnan poistaminen sen id:n perusteella
app.delete('/api/giveaways/:id', (request, response, next) => {
    const id = request.params.id
    Giveaway.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    })
})

//Yksittäisen arvonnan lisääminen
app.post('/api/giveaways', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!body.organizer) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!body.link) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!body.imgid) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const giveaway = new Giveaway ({
        content: body.content,
        organizer: body.organizer,
        link: body.link,
        imgid: body.imgid
    })
    
    giveaway.save().then(savedGiveaway => {
        response.json(savedGiveaway)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})