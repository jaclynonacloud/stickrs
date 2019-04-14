const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Collection = new Schema({
    slug: String, // UNIQUE to Collection
    name: String,
    ownership: String, // User Slug
    created: Date,
    curators: [String], // User Slug
    description: String,
    stickrs: [String], // Stickr Slug
    packs: [String], // Pack Slug
    unlisted: Boolean,
}, {
    collection: 'collections'
})


module.exports = mongoose.model('Collection', Collection)