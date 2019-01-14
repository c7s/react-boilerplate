import { Operation } from '../Operation';
import { User } from '../../domain/user/User';

export class CreateUser extends Operation {
  public usersRepository: any;

  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userData): Promise<void | boolean> {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const user = new User(userData);

    try {
      const newUser = await this.usersRepository.add(user);

      this.emit(SUCCESS, newUser);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateUser.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);
