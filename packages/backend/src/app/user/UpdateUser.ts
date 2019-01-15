import { Operation } from '../Operation';

import { Container } from '../../container';

export class UpdateUser extends Operation {
  protected usersRepository: Container['usersRepository'];
  protected outputs = ['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR'];

  constructor({ usersRepository }: Container) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId: number, userData): Promise<void | boolean> {
    const [SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR] = this.outputs;

    try {
      const user = await this.usersRepository.update(userId, userData);
      this.emit(SUCCESS, user);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}
