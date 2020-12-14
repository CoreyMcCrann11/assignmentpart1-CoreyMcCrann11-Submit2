import express from 'express';

import db from '../models/gameService';

const router = express.Router();

router.post('/', (req, res) => {
    db.createGame(req, res);
});

router.get('/', (req, res) => {
    db.getGames(req, res);
})

router.get('/id', (req, res) => {
    db.findgamebyID(req, res);
})

router.delete('/:id', (req, res) => {
    db.deleteGame(req, res);
})

router.put('/id', (req, res) => {
    db.updateGame(req, res)
})

export default router;