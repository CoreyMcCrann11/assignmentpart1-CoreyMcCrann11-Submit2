import mongoose from 'mongoose';
import express from 'express';

const app = express();

const port = 3000

mongoose.connect('mongodb://localhost:27017/gameDatabase', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});

const gameSchema = new mongoose.Schema({
  gameID: Number,
  name: String,
  gameType: String,
  releaseYear: Number,
  gameDesc: String

});

const Game = mongoose.model('Game', gameSchema);

app.get('/', (req, res) => {

    res.send('This is working');
  })
  
  app.get('/addGame/:gameID/:name/:gameType/:releaseYear/:gameDesc', (req, res) => {
    
    const newGame = new Game
    ({
    gameID: req.params.gameID,
    name: req.params.name,
    gameType: req.params.gameType,
    releaseYear: req.params.releaseDate,
    gameDesc: req.params.gameDesc
    });
  
    newGame.save()
      .then(
          (result) => res.send(`${req.params.gameID} was saved`),
          (result) => res.send(`${req.params.name} was saved`),
          (result) => res.send(`${req.params.gameType} was saved`),
          (result) => res.send(`${req.params.releaseYear} was saved`),
          (result) => res.send(`${req.params.gameDesc} was saved`)
          
          )
      .catch((err) =>
        console.error(err));
  });
  
  app.listen(port, () => console.log(`Example app listening on 
    : ${port}!`))
  