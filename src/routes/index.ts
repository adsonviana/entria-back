import { Router } from 'express';

import UserRouter from './userRoutes';
import AuthRouter from './authRoutes';
import FileRouter from './fileRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
