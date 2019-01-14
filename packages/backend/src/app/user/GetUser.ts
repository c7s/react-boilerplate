import { Operation } from '../Operation';

export class GetUser extends Operation {
  public usersRepository: any;

  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user = await this.usersRepository.getById(userId);
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetUser.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);
