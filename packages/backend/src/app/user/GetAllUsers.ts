import { Operation } from '../Operation';

import { Container } from '../../container';

export class GetAllUsers extends Operation {
  protected usersRepository: Container['usersRepository'];
  protected outputs = ['SUCCESS', 'ERROR'];

  constructor({ usersRepository }: Container) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(): Promise<void> {
    const [SUCCESS, ERROR] = this.outputs;

    try {
      const users = await this.usersRepository.find({
        select: ['id', 'name'],
      });

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}
