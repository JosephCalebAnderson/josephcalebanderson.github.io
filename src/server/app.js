const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 4000;

const mongoose = require('mongoose');
const cors = require('cors');

// Connect Database
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req,res) => res.send('Hello world!'));

const conn_str = 'mongodb+srv://jca47319:MagicIsSick@cluster0.4bpspgl.mongodb.net/'

mongoose.set('strictQuery', false);
mongoose.connect(conn_str, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})
.then(() => {
    app.listen(port)
    console.log('MongoDB Connection Succeeded...')
})
.catch(err => {
    console.log('Error in DB Connection ${err}')
});

// Address Routes
const addresses = require('./routes/api/addresses');
app.use('/api/addresses', addresses);

// Booking Routes
const bookings = require('./routes/api/bookings');
app.use('/api/bookings', bookings);

// Email Routes
const emails = require('./routes/api/emails');
app.use('/api/emails', emails);

// Movie Routes
const movies = require('./routes/api/movies');
app.use('/api/movies', movies);

// PaymentCard Routes
const paymentCards = require('./routes/api/paymentCards');
app.use('/api/paymentCards', paymentCards);

// Promotion Routes
const promotions = require('./routes/api/promotions');
app.use('/api/promotions', promotions);

// Seat Routes
const seats = require('./routes/api/seats');
app.use('/api/seats', seats);

// Showing Routes
const showings = require('./routes/api/showings');
app.use('/api/showings', showings);

// Showroom Routes
const showrooms = require('./routes/api/showrooms');
app.use('/api/showrooms', showrooms);

// Theater Routes
const theaters = require('./routes/api/theaters');
app.use('/api/theaters', theaters);

// Ticket Routes
const tickets = require('./routes/api/tickets');
app.use('/api/tickets', tickets);

// User Routes
const users = require('./routes/api/users');
app.use('/api/users', users);