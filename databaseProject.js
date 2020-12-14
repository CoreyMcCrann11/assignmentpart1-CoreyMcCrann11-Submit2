import mongoose from 'mongoose';
import express from 'express';
import game from './routes/games';

const app = express();

const port = 3000

const connectionString = 'mongodb://127.0.0.1:27017/gameDatabaseProper'

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
  'useCreateIndex' : true
}).
catch( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error :'));

db.once('open', () => {
  console.log("DB connected")
  //HI
});

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/games', game);

app.get('/', (req, res) => 
res.send('This thing is working'));



  
  
  app.listen(port, () => console.log(`Example app listening on 
    : ${port}!`))
  