import express from 'express';
import * as database from './database.js'


const app = express();


// Middleware
app.use(express.json());


// Endpoints
app.get('/members/:niss', async (req, res) => {
  const niss = req.params.niss;
  const member = await database.getMember(niss);
  res.json(member);
});



app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.json(user);
});


// Protection middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'secret-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

//Define error-handling middleware
app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.status(500).send("Something went wrong")
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});