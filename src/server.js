const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./db/config.js')

// require('dotenv').load()

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
)

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(express.static('./dist'))

// routes
app.use('/api/stickrs', require('./db/stickr.route'))
app.use('/api/collections', require('./db/collection.route'))
app.use('/api/users', require('./db/user.route'))


//image posting { image, directory, name, *oldName }
app.post('/api/upload', (req, res) => {
    //get the image data
    let { image, directory, name } = req.body
    image = image.replace(/^data:image\/png;base64,/, "")

    //make the directory if it doesn't exist
    if(!fs.existsSync(path.resolve(__dirname, directory)))
        fs.mkdirSync(path.resolve(__dirname, directory))

    //if there was an old image, delete it
    if(req.body.oldName != null && fs.existsSync(path.resolve(__dirname, directory, req.body.oldName))) {
        fs.unlink(path.resolve(__dirname, directory, req.body.oldName), er => {
            if(er) res.status(400).send("Could not remove old image from database!\n" + err)
        })
    }

    //save to local directory
    fs.writeFile(path.resolve(__dirname, directory, name), image, 'base64', err => {
        if(err) res.status(400).send("Could not upload to database!\n" + err)
        else res.status(200).send("Added successfully to " + path.resolve(__dirname, directory, name))
    })
})

app.listen(PORT, function(){
    console.log('Server is running on Port:', PORT)
})