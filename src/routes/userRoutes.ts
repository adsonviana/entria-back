import { Router } from 'express';
// import auth from '../middlewares/auth';
import { UserController } from '../controllers';

const UserRouter = Router();

UserRouter.post('/', UserController.create,);

UserRouter.get('/', UserController.getAll,);

UserRouter.get('/:id', UserController.getById,);

// UserRouter.patch('/:id', [auth],UserController.update,);  ver questão do auth
UserRouter.patch('/:id',UserController.update,);

// UserRouter.delete('/:id', [auth],UserController.delete,); ver questão do auth
UserRouter.delete('/:id', UserController.delete,);

export default UserRouter;
