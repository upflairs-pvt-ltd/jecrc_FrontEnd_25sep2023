const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
   
    const { name, email } = req.body;
  
   
    console.log(`Name: ${name}, Email: ${email}`);
    res.send('Thank you for register !');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
