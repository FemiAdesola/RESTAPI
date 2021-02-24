const express = require('express');
const router = express.Router();


// Get all staff
router.get('/', (req, res) => {
    res.render('index');
});

module.exports=router