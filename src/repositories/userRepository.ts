import { Prisma, User, UserType } from '@prisma/client';
import prisma from '@database';

class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }
  
  async getAll(userFilter?: UserType): Promise<Prisma.UserGetPayload<{
      include: {
        client: {
          select: {
            orders: true,
            tickets:true,
          }
        };
        organizer: {
          select: {
            events:true,
          }
        }
      };
    }>[]
    > {

    const users = await prisma.user.findMany({
      where: {
        ...(userFilter && { type: userFilter })
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone:true,
        password:true,
        type: true,
        createdAt:true,
        updatedAt: true,
        
        client: {
          select: {
            orders:true,
            tickets:true,
          }
        },
        organizer:{
          select: {
            events:true,
          }
        }
      }
    });

    return users;
  }

  async getById(id: string):   Promise<Prisma.UserGetPayload<{
      include: {
        client: {
          select: {
            orders: true,
            tickets:true,
          }
        };
        organizer: {
          select: {
            events:true,
          }
        }
      };
    }> | null
    > {

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone:true,
        password:true,
        type: true,
        createdAt:true,
        updatedAt: true,
        
        client: {
          select: {
            orders:true,
            tickets:true,
          }
        },
        organizer:{
          select: {
            events:true,
          }
        }
      }
    });

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

}

export default new UserRepository();
