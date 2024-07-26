const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://13DoubleData1313:zm1OUXeZzf4PoBh0@giveaways.tp79sqj.mongodb.net/HomeOfGiveaways?retryWrites=true&w=majority&appName=Giveaways`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Giveaway', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

/*note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

//Tässä pätkässä {} on hakuehto! Esim Note.find({ important: true }).then(result => { etsisi vain muistiinpanoja, jotka ovat tärkeydeltään important
async function findNote() {
    try {
        const result = await Note.find({})
        result.forEach(note => {
            console.log(note)
        })
    }
    catch (error) {
        console.log(error)
    }
    finally {
        mongoose.connection.close()
    }
}

findNote()