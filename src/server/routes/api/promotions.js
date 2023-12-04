const express = require('express');
const promotionsRouter = express.Router();
const promotions = require('../../models/Promotion');
module.exports = promotionsRouter;

/*
NOTE: CHANGING THE SCHEMA COULD HAVE BROKEN THESE, PLEASE UPDATE THEM IF NEEDED
*/



//Add a promotion to the database
promotionsRouter.post("/addPromotion", async (req,res) => {
    try{
        const { name, description, code, amount } = req.body;
        //If code or effect is missing
        if (!name || !description || !code || !amount) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        //If code already exists
        const existingPromotion = await promotions.findOne({ code });
        if (existingPromotion) {
            return res
                .status(400)
                .json({ msg: "Promotion with the same code already exists"});
        }
        //Create new promotion
        const newPromotion = new promotions({ name, description, code, amount });
        //Save promotion to database
        const savedPromotion = await newPromotion.save();
        console.log(savedPromotion.code);
        res.status(200).json(savedPromotion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//Update a promotion from the database
promotionsRouter.put("/updatePromotion", async (req,res) => {
    try{
        const { code, effect } = req.body;
        //Find the promotion with the inputted code
        const updatedPromotion = await promotions.findOneAndUpdate({code}, {effect});
        //If no promotion with the inputted code, return error
        if (!updatedPromotion) {
            return res
                .status(400)
                .json({ msg: "Promotion with the same code does not exist"});
        }
        //update the database
        res.json(updatedPromotion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Delete a promotion from the database
promotionsRouter.delete("/deletePromotion", async (req,res) => {
    try{
        //Delete the promotion with the inputted code
        const deletedPromotion = await promotions.findOneAndDelete({code: req.body.code}, {effect: req.body.effect}, req.body);
        res.json(deletedPromotion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get a promotion based on code and return it
promotionsRouter.get("/getPromotion/:code", async (req,res) => {
    try{
        //Find the promotion with the inputted code
        const foundPromotion = await promotions.findOne({code: req.params.code});
        //Return the promotion
        res.json(foundPromotion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

promotionsRouter.get('/', (req,res) => {
    promotions.find()
    .then((promos) => res.json(promos))
    .catch((err) => res.status(404).json({ noitemsfound: 'No Users found'}));
});