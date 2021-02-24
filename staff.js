const express = require('express');
const router = express.Router();
const Staff = require('../middleware/logger');

//Get all staff 

router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const staff = await Staff.find(searchOptions);
        res.render('staff/index', {
            staff: staff,
            searchOptions:req.query
        });

    } catch {
        res.redirect('/')
    }
   
});

// New staff 
router.get('/new', (req, res) => {
    res.render('staff/new', { staff: new Staff() });
});

// Create New staff 
router.post('/', (req, res) => {
    const staff = new Staff({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email
    });

    staff.save((err, newStaff) => {
        if (err) {
            res.render('staff/new', {
                staff: staff,
                errorMessage: 'Error in Creating Staff'
            });
        } else {
            res.redirect('staff');
        };
    });
    
});

router.get('/id', (req, res) => {
    res.send('Show Satff' + req.params.id)
});


// for editting 
router.get('/id/edit', async(req, res) => {
    try {
        const staff = await Staff.findById(req.params, id)
        res.render('staff/edit', {staff:staff()})
    } catch {
        res.redirect('/staff')
    }
    
});

// to update 
router.put('/id', (req, res) => {
    res.send('Update Satff' + req.params.id)
});

// for deleting 
router.delete('/id', (req, res) => {
    res.send('Delete Satff' + req.params.id)
});

module.exports= router