const express = require ('express');
const path =  require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const port = 6777;

bodyParser.urlencoded({extended: false});

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views' ,'index.html'));
});

app.get('/login.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
});

mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('Connected to MongoDB database'))
.catch(err => console.error('Error connecting to MongoDB:', err))

app.use(express.urlencoded({ extended: false}));

var formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
    password: String,
    cpassword: String

});

const formModel = mongoose.model('Form', formSchema);

app.post('/', (req, res)=>{
    const {firstName, lastName, email, contact, password} = req.body;

    const formData = new formModel({
        firstName,
        lastName,
        email,
        contact,
        password,
    });

    formData.save().then(()=>{
        res.send('Record inserted Successfully!');
    })
    .catch(err=>{
        console.error('Error inserting record:', err);
        res.status(500).send('An error occurred while inserting the record.')
    });
});

app.listen(port, ()=>{
    console.log('app is listening on port ' + port)
});