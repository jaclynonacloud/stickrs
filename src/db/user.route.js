const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


//get the model
let User = require('./user.model')

/* **************************************** */
/*                  ROUTES                  */
/* **************************************** */
//ALL
router.route('/').get((req, res) => {
    User.find((err, data) => {
        if(err) res.json(err)
        else res.json(data)
    })
})

//ONE
router.route('/:users/:slug').get((req, res) => {
    User.findOne({slug:req.params.slug}, (err, data) => {
        if(data != null) res.status(200).json(data)
        else res.status(400).send("Could not find user!")
    })
})

//ADD
router.route('/add').post((req, res) => {
    let stickr = new User(req.body)

    //make sure this is a unique user in collection
    User.findOne({slug:req.body.slug}, (err, data) => {
        if(!data) {
            //if there is no other user with this slug, add it
            stickr.save()
                .then(() => res.status(200).send("User added successfully!"))
                .catch((e) => res.status(400).send("Unable to save user to database\n" + e))
        }
        else res.status(400).send("Unable to save user to database.  User with this slug already exists!")
    })
})

module.exports = router