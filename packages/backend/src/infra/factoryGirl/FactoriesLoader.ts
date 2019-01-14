import { readdirSync } from 'fs';
import { join } from 'path';

export const FactoriesLoader = {
  load({ factoryGirl, baseFolder, models }) {
    readdirSync(baseFolder)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file) => {
        const factoryPath = join(baseFolder, file);
        const factory = require(factoryPath);

        factory(factoryGirl, models);
      });

    return factoryGirl;
  }
};
