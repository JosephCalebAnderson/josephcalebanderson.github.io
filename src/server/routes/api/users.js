const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../../models/User');

module.exports = userRouter;

// Signup Route
userRouter.post("/signup", async (req,res) => {
    try {
        const { email, password, username, fullName, phoneNumber, dob, admin, userStatus, promotions} = req.body;
        if (!email || !password || !username || !fullName || !phoneNumber || !dob) {
            return res.status(400).json({ msg: "Please enter all the fields" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ msg: "Password should be at least 6 characters"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ msg: "User with the same email already exists"});
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        const newUser = new User({ email, password: hashedPassword, username, fullName, phoneNumber, dob, admin, promotions});

        const savedUser = await newUser.save();
        console.log(savedUser.username);
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
userRouter.post("/login", async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User with this email does not exist" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, user: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// password verification route for password reset
userRouter.post("/password", async (req,res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ msg: "Please verify your current password" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." });
        }
        res.json({ msg: 'Password verification successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get users by promotions
userRouter.get('/promotions', (req,res) => {
    User.find({promotions: true})
    .then((users) => {
        const emails = users.map(user => user.email);
        res.json(emails)})
    .catch((err) => res.status(404).json({ noitemfound: 'No User with that email'}));
});

//Currently working on these, they need to be tested.

// Adding a new User
userRouter.post('/', (req,res) => {
    User.create(req.body)
    .then((user) => res.json({ msg: 'User added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this User'}));
});

//Get User by email route (Especially need to make sure this route works)
userRouter.get('/:email', (req,res) => {
    User.findOne({email: req.params.email})
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ noitemfound: 'No User with that email'}));
});

// Update items route (If these routes have bugs, the "findOneAndUpdate" can be split into findOne.updateOne)
userRouter.put('/:email', async (req,res) => {
    var newBody = req.body;
    if (newBody.password != null) {
        var newPassword = "" + await bcryptjs.hash(req.body.password, 8);
        newBody.password = newPassword
    }
    const foundUser = User.findOneAndUpdate({email: req.params.email}, newBody)
    .then((user) => {
        if (user == null) {
            return res.status(400).json({ msg: "No User with this email found." });
        } else {
        res.json(user)
        }
    })
    .catch((err) => res.status(400).json({ error: 'Unable to update this user'}));
});

// Delete items route (If these routes have bugs, the "findOneAndUpdate" can be split into findOne.updateOne)
userRouter.delete('/:email', (req,res) => {
    User.findOneAndRemove({email: req.params.email}, req.body)
    .then((user) => res.json({ msg: 'User deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such User found'}));
});

//The following are not useful now, but might be userful in the future


// Get all User route
userRouter.get('/', (req,res) => {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ noitemsfound: 'No Users found'}));
});

// Get User by id route
userRouter.get('/id/:id', (req,res) => {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ noitemfound: 'This user could not be found'}));
});

// Update items route
userRouter.put('/id/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: 'User updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this User'}));
});

// Delete items route
userRouter.delete('/id/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ msg: 'User deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such User found'}));
});

//Update User Status Route
userRouter.put('/status/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json({ msg: 'User status updated successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to update this User status'}));
});


