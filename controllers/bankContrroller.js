const express = require('express');
const router = express.Router();
const Bank = require('../models/bank');

// Create
router.post('/addbank', async (req, res) => {
    const bank = new Bank(req.body);
    try {
        const existingBank = await Bank.findOne({ bank_user:req.body.bank_user });
        if (existingBank) {
            res.status(400).json({ message: 'Bank details already exist' });
        } else {
            await bank.save();
            res.status(201).json({data:bank});
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read
router.get('/bankdetails', async (req, res) => {
    try {
        const banks = await Bank.find({}).populate('bank_user');
        res.send(banks);
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/getbank', async (req, res) => {
    try {
        const bank = await Bank.find({bank_user:req.body.id});
        if (!bank) {
            return res.status(404).send();
        }
        res.status(200).json({data:bank}).populate('bank_user');
    } catch (error) {
        res.status(500).send();
    }
});

// Update
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const bank = await Bank.findById(req.params.id);
        if (!bank) {
            return res.status(404).send();
        }
        updates.forEach((update) => bank[update] = req.body[update]);
        await bank.save();
        res.send(bank);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id);
        if (!bank) {
            return res.status(404).send();
        }
        res.send(bank);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;