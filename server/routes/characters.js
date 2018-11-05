const express   = require('express');
const router    = express.Router();

const characters = require('../controllers/index')

router.post('/characters/:id', characters.createSeeded)
router.get('/characters', characters.allCharacters); 
router.get('/characters/:id', characters.singleCharacter);
router.get('/multipliers/:id/:p', characters.multipliers);
router.get('/specials/:id/:p', characters.specialMultiplier)

module.exports = router;