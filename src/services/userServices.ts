import { UserInput, UserUpdateInput } from '@DTOs';
import { hash } from 'bcryptjs';
import { UserRepository } from '@repositories';
import prisma from '@database';
import { UserType } from '@prisma/client';

class UserService{

    async create(data: UserInput){

        const existsEmail = await UserRepository.getByEmail(data.email);
        if (existsEmail) {
            const error = new Error('This email is already registred') as any;
            error.status = 400;
            throw error;
        }
    
        const userData = {
            ...data,
            password: await hash(data.password, 8),
        };
        
        return prisma.$transaction( async (tx) => {
            
            const user = await tx.user.create({
                data:userData
            });

            if (userData.type==='ADMIN'){
                await tx.admin.create({
                    data:{
                        id: user.id
                    }
                })
            }

            if (userData.type==='CLIENT'){
                await tx.client.create({
                    data:{
                        id: user.id
                    }
                })
            }

            if (userData.type==='ORGANIZER'){
                await tx.organizer.create({
                    data:{
                        id: user.id
                    }
                })
            }

            return user;
        })

    }

    async getAll(userFilter?:UserType){


        const users = await UserRepository.getAll(userFilter);
        const formattedUsers = users.map((user) => ({
            id: user.id,
            type: user.type,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            tickets: user.client?.tickets,
            orders: user.client?.orders,
            events: user.organizer?.events,
        }))

        return formattedUsers;
    }

    async getById(id: string){
        const user = await UserRepository.getById(id);

        if (user) {
            const formattedUser = {
                id: user.id,
                type: user.type,
                name: user.name,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                tickets: user.client?.tickets,
                orders: user.client?.orders,
                events: user.organizer?.events,
            }
            return formattedUser;
        }

        return user;
    }

    async update(id: string, data:UserUpdateInput){
        const userId = id;
        const userData = data;
        const updatedUser = await UserRepository.update(userId, userData);

        return updatedUser;
    }

    async delete(id: string){
        const userId = id;
        const deletedUser = await UserRepository.delete(userId)

        return deletedUser;
    }

}

export default new UserService();