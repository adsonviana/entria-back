import { Request, Response, NextFunction } from 'express';
import { User, UserUpdate } from '../DTOs';
import { UserServices } from '../services';
import { UserType } from '@prisma/client';
import { z } from 'zod';


export const UserQuery = z.object({
  type: z.nativeEnum(UserType).optional(),
});

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = User.parse(req.body);

      const user = await UserServices.create(userData)

      res.locals = {
        status: 201,
        data: user,
        message: 'User created',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction){
    try {
      const userFilter  = UserQuery.parse(req.query);

      const users = await UserServices.getAll(userFilter.type);

      if (users.length===0){
        return next({
          status: 404,
          message: 'Users not found'
        })
      }

      res.locals = {
        status: 200,
        data: users,
        message:'Users found',
      }

      return next();

    } catch (error){
      return next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await UserServices.getById(id);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userData = UserUpdate.parse(req.body);

      const user = await UserServices.update(id, userData);

      res.locals = {
        status: 200,
        data: user,
        message: 'User updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedUser = await UserServices.delete(id);

      res.locals = {
        status: 200,
        data:deletedUser,
        message: 'User deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
