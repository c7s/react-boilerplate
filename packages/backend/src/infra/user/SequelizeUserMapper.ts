import { User } from '../../domain/user/User';

export const UserMapper = {
  toEntity({ dataValues }) {
    const { id, name } = dataValues;

    return new User({ id, name });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};
