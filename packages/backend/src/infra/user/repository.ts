import { Repository, EntityRepository } from 'typeorm';
import { User } from '../database/models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    //
}
