//Kirjasto, jolla ohjelmoida Node-backendisiä web-sovelluksia
const express = require('express')
const cors = require('cors')
const app = express()

//Jotta frontend ja backend voivat kommunikoida keskenään eri porteilla
app.use(cors())


//json parser (tarvitsee datan lisäämiseen)
app.use(express.json())
app.use(express.static('dist'))

let giveawaysBackend = [
    {
        "id": "1",
        "content": "CS2 skin k k k k k kk k k k k k kk k k k k k k k k k k kk  kk k k k k k k k k k k k kk k k k k k k k k k k k k kk k k k k k k k k k k k k k k k",
        "organizer": "Anomaly",
        "link": null,
        "imgid": "a"
    },
    {
        "id": "2",
        "content":"CS2 skin",
        "organizer":"Banks",
        "link": "https://x.com/BanKsEsports/status/1815004908258545738",
        "imgid": "1hUAsBnVO2DZUPfbKD89UOygoe3D9oMN0"
    },
    {
        "id":"3",
        "content":"TECH",
        "organizer":"PowerGPU",
        "imgid": ""
    },
    {
        "id": "4",
        "content":"test",
        "organizer": "test",
        "imgid": "test"
    }
]

//localhost:port palautaa Hello Worldin
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//Haetaan kaikki arvonnat
app.get('/api/giveaways', (request, response) => {
    response.json(giveawaysBackend)
})

//Haetaan yksittäinen arvonnat sen id:n perusteella
app.get('/api/giveaways/:id', (request, response) => {
    const id = request.params.id
    const giveaway = giveawaysBackend.find(giveaway => giveaway.id === id)
    if (giveaway) {
        response.json(giveaway)
    }
    else {
        response.status(404).end()
    }
})

//Yksittäisen arvonnan poistaminen sen id:n perusteella
app.delete('/api/giveaways/:id', (request, response) => {
    const id = request.params.id
    giveawaysBackend = giveawaysBackend.filter(giveaway => giveaway.id !== id)

    response.status(204).end()
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

    const giveaway = {
        id: generateId(),
        content: body.content,
        organizer: body.organizer,
        link: body.link,
        imgid: body.imgid
    }
    //laajennetaan nykyistä taulukkoa postatulla arvonnalla
    giveawaysBackend = giveawaysBackend.concat(giveaway)

    response.json(giveaway)
})

const generateId = () => {
    let maxId = 0
    //Mapitetaan giveawaysBackend taulukko ja asetetaan maxId:ksi taulukon suurin arvo
    if (giveawaysBackend > 0) {
        maxId = Math.max(...giveawaysBackend.map(x => Number(x.id)))
    }
    else {
        maxId = 0
    }
    //Arvonnan id on maxId+1, samalla muutetaan se Stringiksi
    return String(maxId + 1)
}
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})