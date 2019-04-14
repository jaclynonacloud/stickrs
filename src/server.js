const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./db/config.js')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(express.static('./dist'))

// routes
app.use('/api/stickrs', require('./db/stickr.route'))
app.use('/api/collections', require('./db/collection.route'))
app.use('/api/users', require('./db/user.route'))


//image posting { image, directory, name }
app.post('/api/upload', (req, res) => {
    //get the image data
    const { image, directory, name } = req.body
    //make the directory if it doesn't exist
    if(!fs.existsSync(path.resolve(__dirname, directory)))
        fs.mkdirSync(path.resolve(__dirname, directory))
    //save to local directory
    fs.copyFile(image, path.resolve(__dirname, directory, name), err => {
        if(err) res.status(400).send("Could not upload to database!\n" + err)
    })
})

app.listen(PORT, function(){
    console.log('Server is running on Port:', PORT)
})