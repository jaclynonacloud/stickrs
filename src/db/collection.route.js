const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


//get the model
let Collection = require('./collection.model')

/* **************************************** */
/*                  ROUTES                  */
/* **************************************** */
//ALL
router.route('/').get((req, res) => {
    Collection.find((err, data) => {
        if(err) res.json(err)
        else res.json(data)
    })
})

//ONE
router.route('/:slug').get((req, res) => {
    Collection.findOne({slug:req.params.slug}, (err, data) => {
        if(data != null) res.status(200).json(data)
        else res.status(400).send("Could not find collection!")
    })
})

//ADD
router.route('/add').post((req, res) => {
    let collection = new Collection(req.body)

    //make sure this is a unique collection
    Collection.findOne({slug:req.body.slug}, (err, data) => {
        if(!data) {
            //if there is no other stickr with this slug, add it
            collection.save()
                .then(() => res.status(200).send({ "message" : "Collection added successfully!", "result" : collection }))
                .catch((e) => res.status(400).send("Unable to save collection to database\n" + e))
        }
        else res.status(400).send("Unable to save collection to database.  Collection with this slug already exists!")
    })
})

module.exports = router