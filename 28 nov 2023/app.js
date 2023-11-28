const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb://localhost:27017/formsubmit';
const client = new MongoClient(uri);  

client.connect(err => {
    if (err) {
        console.error('Failed to connect to the database');
    } else {
        console.log('Connected to the database');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { name, email } = req.body;

    const collection = client.db().collection('users');
    collection.insertOne({ name, email }, (err) => {
        if (err) {
            console.error('Error inserting data into MongoDB', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(`Name: ${name}, Email: ${email} saved to MongoDB`);
            res.send('Thank you for submitting the form. Your data has been registered successfully!');
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
