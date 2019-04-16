const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Stickr = new Schema({
    slug: String, // UNIQUE to Collection
    coll: String, // Collection Slug
    name: String,
    ownership: [{ name: String, url: String }],
    artist: [{ name: String, url: String}],
    curator: String, // User Slug
    uploaded: Date,
    description: String,
    hidden: Boolean,
    unlisted: Boolean,
    shiny: Boolean,
    addToStartr: Boolean,
    availability: [Schema.Types.Mixed],
    rarity: Number
}, {
    collection: 'stickrs'
})


module.exports = mongoose.model('Stickr', Stickr)