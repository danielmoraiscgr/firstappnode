import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        user_id,
    }: IRequest): Promise<Omit<User, 'password'>> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(' User not found.');
        }

        const { password , ...rest } = user;
        //return user; 

        return rest;

        // solução para remover um field no retorno json
    }
}

export default ShowProfileService;
