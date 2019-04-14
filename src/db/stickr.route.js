const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


//get the model
let Stickr = require('./stickr.model')

/* **************************************** */
/*                  ROUTES                  */
/* **************************************** */
//ALL
router.route('/').get((req, res) => {
    Stickr.find((err, data) => {
        if(err) res.json(err)
        else res.json(data)
    })
})

//ONE
router.route('/:collection/:slug').get((req, res) => {
    Stickr.findOne({slug:req.params.slug, slugCollection:req.params.collection}, (err, data) => {
        if(data != null) res.status(200).json(data)
        else res.status(400).send("Could not find stickr!")
    })
})

//ADD
router.route('/add').post((req, res) => {
    let stickr = new Stickr(req.body)

    //make sure this is a unique stickr in collection
    Stickr.findOne({slug:req.body.slug, slugCollection:req.body.slugCollection}, (err, data) => {
        if(!data) {
            //if there is no other stickr with this slug, add it
            stickr.save()
                .then(() => res.status(200).send("Stickr added successfully!"))
                .catch((e) => res.status(400).send("Unable to save stickr to database\n" + e))
        }
        else res.status(400).send("Unable to save stickr to database.  Stickr with this slug already exists in the collection!")
    })
})

module.exports = router