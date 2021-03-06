const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    slug: String, // UNIQUE to Collection
    name: String,
    email: String,
    password: String,
    spasshash: String,
    description: String,
    joined: Date,
    collectedStickrs: [{slug:String, coll:String}],
    featuredStickrs: [{slug:String, coll:String}], //stickrs on profile

    curateCollections: [String], //collections a user curates but doesn't own
    curateStickrs: [{slug:String, coll:String}],
    curatePacks: [String],
    favStickrs: [{slug:String, coll:String}],
    favCollections: [String],
    subCollections: [String],
    favPacks: [String],
    subPacks: [String]
}, {
    collection: 'users'
})


module.exports = mongoose.model('User', User)