const data = require('../assets/data');
const captains = require('../methods/captains');
const specials = require('../methods/specials')
const Characters = require('../models/characters')


const createSeeded = (req, res) => {
    let {id} = req.params;
    let characters = data[id];

    Characters.create(characters)
        .then((characters) => {
            res.status(200).send({ userBox: characters });
        })
        .catch((err) => {
            res.status(500).send({ Error: err.message });
        })
}



const allCharacters = (req, res) => {
    res.send({ characters: data });
}

const singleCharacter = (req, res) => {
    let {id} = req.params;
    let single = data[id];
    res.send({ single });
}

const multipliers = (req, res) => {
    let {id, p} = req.params;
    
    if (captains[id] != undefined) {
        if (captains[id].atk != undefined) {
            res.json({ result: captains[id].atk(p) })
        } 
        // else if (captains[id].hp != undefined) {
        //     res.json({result: captains[id].hp(p)})
        // } else if (captains[id].rcv != undefined) {
        //     res.json({result: captains[id].rcv(p)})
        // }
    } else {
        res.json({ result: 1})
    }
}

const specialMultiplier = (req, res) => {
    let {id, p} = req.params;
    
    if (specials[id] != undefined) {
        if (specials[id].atk != undefined) {
            res.json({ result: specials[id].atk(p) })
        } 
        // else if (captains[id].hp != undefined) {
        //     res.json({result: captains[id].hp(p)})
        // } else if (captains[id].rcv != undefined) {
        //     res.json({result: captains[id].rcv(p)})
        // }
    } else {
        res.json({ result: 1})
    }
}

module.exports = { allCharacters, singleCharacter, multipliers, specialMultiplier, createSeeded }

