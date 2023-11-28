const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017'; 
const dbName = 'mydatabase';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { name, email, mobile } = req.body;

   
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to the database');

       
        const db = client.db(dbName);

       
        const usersCollection = db.collection('users');
        await usersCollection.insertOne({ name, email, mobile });

        console.log(`Name: ${name}, Email: ${email}, Mobile: ${mobile}`);
        res.send('Thank you for registering!');
    } finally {
      
        await client.close();
        console.log('Connection closed');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
