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

const playerSchema = new mongoose.Schema({
  playerID : Number,
  playerName : String,
  favoriteGenre: String,
  personalDescription : String,
  gamerScore: Number
})

const Game = mongoose.model('Game', gameSchema);
const Player = mongoose.model('Player', playerSchema);

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

  app.get('/addPlayer/:playerID/:playerName/:favoriteGenre/:personalDescription/:gamerScore', (req, res) => {
    const newPlayer = new Player
    ({
      playerID: req.params.playerID,
      playerName: req.params.playerName,
      favoriteGenre: req.params.favoriteGenre,
      personalDescription: req.params.personalDescription,
      gamerScore: req.params.gamerScore
    });

     newPlayer.save()
     .then(
       (result) => res.send(`${req.params.playerID} was saved`),
       (result) => res.send(`${req.params.playerName} was saved`),
       (result) => res.send(`${req.params.favoriteGenre} was saved`),
       (result) => res.send(`${req.params.personalDescription} was saved`),
       (result) => res.send(`${req.params.gamerScore} was saved`)
     )
     .catch((err) =>
      console.error(err));
  });
  
  
  app.listen(port, () => console.log(`Example app listening on 
    : ${port}!`))
  