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
    .then((result) 
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

}

function findgamebyID(req, res) {
    const id = req.params.gameID
}

export default {createGame, getGames}