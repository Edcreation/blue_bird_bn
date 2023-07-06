import express from 'express';
import { RESPONSE } from '../../types';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';

const router = express.Router();

router.use('/auth/', authRoutes);
router.use('/profile', profileRoutes);

router.get('/hi', (req, res) => {
    res.status(200).json({
        code: 200,
        message: 'Hi'
    } as RESPONSE)
})

export default router;