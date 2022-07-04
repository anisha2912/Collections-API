const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    collectionname:String,
    products:Number,
});

module.exports = mongoose.model('Collection',CollectionSchema);