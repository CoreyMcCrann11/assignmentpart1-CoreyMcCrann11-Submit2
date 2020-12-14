import { Game } from "./gameModel";

function getGames(req, res, options = []) {
    const {gameID, gameName, gamereleaseYear, gameGenre, gameDesc, limit} = req.query;
    let filter = {};

    if (gameID) {
        filter.gameID = gameID;
    }

    if (gameName) {
        filter.gameName = {$regex: `^${gameName}$`, $options: 'i'};
    }

    if (gamereleaseYear){
        filter.gamereleaseYear = gamereleaseYear;
    }

    if (gameGenre) {
        filter.gameGenre = {$regex: `^${gameGenre}$`, $options: 'i'};
    }

    if (gameDesc) {
        filter.gameDesc = {$regex: `^${gameDesc}$`, $options: 'i'};
    }

    const limitNumber = parseInt(limit)

    Game.find(filter)
    .limit(limitNumber)
    .then((result) => {
        res.json(result)
    })
    


}

function createGame(req, res) {
    let gameDoc = new Game(req.body);
    gameDoc.save()
    .then((result) => {
        console.log('Game has been saved');
        res.location(result.uri)
        .status(201)
        .json({ id: result._id, uri: result.uri})
    })
    .catch((error) => {
        res.status(412).json({status: 'fail', message: 'not created' + error})
    });
    console.log('Promising to save');

}

function findgamebyID(req, res) {
    const id = req.params.id;
    Game.findById(id)
    .then((result) => {
        console.log('result', +result.uri);

        res.json(result)
    })
}

function updateGame(req, res) {
    const id = req.params.id;
    console.log('Updating game ' +id)

    Game.findByIdAndUpdate({_id: id}, {...req.body})
    .then((result) => {
        if (result)
        {
            res.status(200).send({message: 'game has been updated'})
        }
        else
        {
            res.status(404).send({message: 'game was not found'})
        }
    })
}

function deleteGame(req, res) {
    const id = req.params.id;

    Game.findByIdAndDelete(id)
    .then((result) => {
        if (result) {
            res.status(203).send({message: 'deleted'})
        }
        else
        {
            res.status(404).send({message: 'game was not found'})
        }
    })
    //push
}

export default {createGame, getGames, findgamebyID, updateGame, deleteGame}