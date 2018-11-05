const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    When creating a schema see the data specs in data/rides
*/

var userSchema = new Schema({
    aliases: {
        type: Array,
        required: true,
        trim: true
    },
    cooldowns: Array,
    abilityDetails: {
        required: false
    },
    evolutions: {
        required: false
    },
    families: {
        type: String,
        required: false
    },
    units: {
        type: Array,
        required: false
    },
    flags: {
        required: false
    },
    res:{
        required: false
    },
    id: {
        type: Number
    }
});


// pickUp: "483 Diamond Street, Rosewood",
// dropOff: "547 Livingston Street, Fannett",
// cost: "$10.79",
// date: "Tuesday, September 12, 2017 3:45 AM",
// rating: 5,
// userId: 04231

var Characters = mongoose.model('Characters', userSchema);

module.exports = Characters