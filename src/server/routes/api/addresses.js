const express = require('express');
const addressRouter = express.Router();
const Address = require('../../models/Address');
module.exports = addressRouter;

// Add a new address
addressRouter.post('/', async (req,res) => {
    try {
        const {street, city, state, zipCode} = req.body;
        if (!street || !city || !state || !zipCode) {
            return res.status(400).json({ msg: "Please enter all the fields" });
        } else {
        const newAddress = new Address(req.body);
        const savedAddress = await newAddress.save();
        return res.json(savedAddress);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// delete a address, they are found by their id.
addressRouter.delete('/:addressID', (req,res) => {
    Address.findByIdAndRemove({_id: req.params.addressID}, req.body)
    .then((address) => res.json({ msg: 'Address deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Address found'}));
});

// get the address associated with the given userID
addressRouter.get('/:userID', (req,res) => {
    Address.findOne({userID: req.params.userID})
    .then((address) => res.json(address))
    .catch((err) => res.status(404).json({ noitemfound: 'No Address found'}));
});

// update an address
addressRouter.put('/:addressID', (req,res) => {
    Address.findByIdAndUpdate({_id: req.params.addressID}, req.body)
    .then((address) => res.json({ msg: 'Address updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Address'}));
});