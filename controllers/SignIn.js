  const handleSignin = (req, res, postgrestable, bcrypt) => { 
      const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json('incorrect form submission');
        }
    postgrestable.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return postgrestable.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}
    module.exports = {
      handleSignin: handleSignin
    }