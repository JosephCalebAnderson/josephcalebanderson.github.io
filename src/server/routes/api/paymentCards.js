const express = require('express');
const bcryptjs = require("bcryptjs");
const paymentCardRouter = express.Router();
const PaymentCard = require('../../models/PaymentCard');
module.exports = paymentCardRouter;

// Add a new payment card (This route needs to be updated to encrypt the cardNum)
paymentCardRouter.post('/',  async (req,res) => {
    try {
        const { userID, cardNum, expiration, type, nameOnCard, cvv} = req.body;
        if (!cardNum || !expiration || !type || !nameOnCard || !cvv) {
            return res.status(400).json({ msg: "Please enter all the fields" });
        }
        var ending = "XXXX-XXXX-XXXX-"
        if (cardNum.length<4) {
            ending = ending + cardNum;
        } else {
            ending = ending + cardNum.substr(cardNum.length - 4);
        }
        const hashedCardNum = await bcryptjs.hash(cardNum, 8);
        const newCard = new PaymentCard({ userID, cardNum: hashedCardNum, expiration, type, nameOnCard, cvv, ending});
        const savedCard = await newCard.save();
        return res.json(savedCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// delete a payment card, they are found by their id.
paymentCardRouter.delete('/:paymentCardID', (req,res) => {
    PaymentCard.findByIdAndRemove({_id: req.params.paymentCardID}, req.body)
    .then((paymentCard) => res.json({ msg: 'Card deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such Card found'}));
});

// get all of the payment cards associated with a user (should these be unencrypted in the fronted or along this get route?)
paymentCardRouter.get('/:userID', (req,res) => {
    PaymentCard.find({userID: req.params.userID})
    .then((paymentCard) => res.json(paymentCard))
    .catch((err) => res.status(404).json({ noitemfound: 'No Cards found'}));
});

// update a payment card
paymentCardRouter.put('/:paymentCardID', async (req,res) => {
    var newBody = req.body;
    if (newBody.cardNum != null) {
        var ending = "XXXX-XXXX-XXXX-"
        if (newBody.cardNum.length<4) {
            ending = ending + newBody.cardNum;
        } else {
            ending = ending + newBody.cardNum.substr(newBody.cardNum.length - 4);
        }
        newBody.ending = ending;
        var newCardNum = "" + await bcryptjs.hash(req.body.cardNum, 8);
        newBody.cardNum = newCardNum;
    }
    PaymentCard.findByIdAndUpdate({_id: req.params.paymentCardID}, newBody)
    .then((paymentCard) => res.json({ msg: 'Card updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this Card'}));
});