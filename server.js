const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');
const register = require('./controllers/Register.js');
const signin = require('./controllers/SignIn.js');
const profile = require('./controllers/Profile.js');
const image = require('./controllers/Image.js');



const postgrestable = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
      rejectUnauthorized: false
    },
	}
});



const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req, res)=> {
  res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, postgrestable, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, postgrestable, bcrypt, saltRounds)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, postgrestable)})

app.put('/image', (req, res) => {image.handleImage(req, res, postgrestable)})

app.post('/imageurl', (req, res) => ( image.handleApiCall(req, res)))
//process.env chooses a port that is given, if it is given even.
app.listen(process.env.PORT || 3001, ()=> {
	console.log("appp is here")
})