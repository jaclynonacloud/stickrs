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
    Stickr.findOne({slug:req.params.slug, coll:req.params.collection}, (err, data) => {
        if(data != null) res.status(200).json(data)
        else res.status(400).send("Could not find stickr!")
    })
})

//ADD
router.route('/add').post((req, res) => {
    let stickr = new Stickr(req.body)

    //make sure this is a unique stickr in collection
    Stickr.findOne({slug:req.body.slug, coll:req.body.coll}, (err, data) => {
        if(!data) {
            //if there is no other stickr with this slug, add it
            stickr.save()
                .then(() => res.status(200).send("Stickr added successfully!"))
                .catch((e) => res.status(400).send("Unable to save stickr to database\n" + e))
        }
        else res.status(400).send("Unable to save stickr to database.  Stickr with this slug already exists in the collection!")
    })
})
//EDIT
router.route('/edit').put((req, res) => {
    let dat = omit(req.body, 'oldSlug')

    //check to see if slug has changed
    if(req.body.oldSlug != req.body.slug) {
        //make sure this is a unique stickr in collection
        Stickr.findOne({slug:req.body.slug, coll:req.body.coll}, (err, data) => {
            if(!data) {
                //if there is no other stickr with this slug, edit it
                Stickr.updateOne({slug:req.body.slug, coll:req.body.coll}, dat)
                    .then(() => res.status(200).send("Stickr edited successfully!"))
                    .catch(e => res.status(400).send("Unable to edit stickr in database\n" + e ))
            }
            else res.status(400).send("Unable to save stickr to database.  Stickr with this slug already exists in the collection!")
        })
    }
    //otherwise, just save
    else {
        Stickr.updateOne({slug:req.body.slug, coll:req.body.coll}, dat)
            .then(() => res.status(200).send("Stickr edited successfully!"))
            .catch(e => res.status(400).send("Unable to edit stickr in database\n" + e ))
    }

})


function omit(obj, omitKey) {
    return Object.keys(obj).reduce((result, key) => {
        if(key !== omitKey) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

module.exports = router