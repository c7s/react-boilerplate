import { Operation } from '../Operation';

import { Container } from '../../container';

export class DeleteUser extends Operation {
  protected usersRepository: Container['usersRepository'];
  protected outputs = ['SUCCESS', 'ERROR', 'NOT_FOUND'];

  constructor({ usersRepository }: Container) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId): Promise<void | boolean> {
    const [ SUCCESS, ERROR, NOT_FOUND ]= this.outputs;

    try {
      await this.usersRepository.remove(userId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

