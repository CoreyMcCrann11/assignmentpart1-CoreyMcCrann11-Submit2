import express from 'express';

import db from '../models/gameService';

const router = express.Router();

router.post('/', (req, res) => {
    db.createGame(req, res);
});

export default router;