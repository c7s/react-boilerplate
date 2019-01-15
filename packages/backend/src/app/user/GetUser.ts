import { Operation } from '../Operation';

import { Container } from '../../container';

export class GetUser extends Operation {
  protected usersRepository: Container['usersRepository'];
  protected outputs = ['SUCCESS', 'ERROR', 'NOT_FOUND'];

  constructor({ usersRepository }: Container) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId: number) {
    const [ SUCCESS, NOT_FOUND ] = this.outputs;

    try {
      const user = await this.usersRepository.findOne(userId);
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}
