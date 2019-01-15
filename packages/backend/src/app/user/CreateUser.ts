import { Operation } from '../Operation';
import { User } from '../../domain/user/User';

import { Container } from '../../container';

export class CreateUser extends Operation {
  protected usersRepository: Container['usersRepository'];
  protected outputs = ['SUCCESS', 'ERROR', 'VALIDATION_ERROR'];

  constructor({ usersRepository }: Container) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userData): Promise<void | boolean> {
    const [ SUCCESS, ERROR, VALIDATION_ERROR ] = this.outputs;

    const user = new User(userData);

    try {
      const newUser = await this.usersRepository.insert(user);

      this.emit(SUCCESS, newUser);
    } catch (error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}
