const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'John@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Jebadiah',
			email: 'Jebadiah@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		}				
	]
};

app.get('/', (req, res)=> {
	res.send('here we go');

});

app.post('/signin', (req, res) => {

	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		return res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}
});


app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
 //    // Store hash in your password DB.
	// });
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
							//grabs the last item in thedatabase
	res.json(database.users[database.users.length-1])
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(404).json('no such id bro -_-');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	console.log(id)''
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			entries++
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(404).json('user was found');
	}
})

//process.env chooses a port that is given, if it is given even.
app.listen(process.env.PORT || 3001, ()=> {
	console.log("appp is here")
})