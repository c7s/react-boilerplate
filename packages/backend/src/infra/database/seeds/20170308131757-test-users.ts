import { dataFaker } from '../support/dataFaker';

export function up(queryInterface) {
    const testUsers = [];

    for(let i = 0; i < 20; i++) {
        testUsers.push({
            name: dataFaker.name(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    return queryInterface.bulkInsert('users', testUsers, {});
}

export function down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
};
