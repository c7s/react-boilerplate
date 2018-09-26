const prompt = require('prompt');
const { execSync } = require('child_process');

/**
 * @enum {string}
 */
const DataKind = {
    NAME: 'name',
    SURNAME: 'surname',
    EMAIL: 'email',
};

async function configure() {
    execSync(`git config --global user.name "${await getData(DataKind.NAME)} ${await getData(DataKind.SURNAME)}"`);
    execSync(`git config --global user.email "${await getData(DataKind.EMAIL)}"`);
    execSync('git config --global push.default current');
    execSync('git config --global rerere.enabled true');
    execSync('git config --global pull.rebase true');
    execSync('git config --global merge.ff false');
}

/**
 * @param dataKind {DataKind}
 * @returns {Promise<string>}
 */
function getData(dataKind) {
    return new Promise((resolve, reject) => {
        prompt.message = '';
        prompt.delimiter = '';
        prompt.colors = false;

        let description;
        let message;
        let pattern;

        switch (dataKind) {
            case DataKind.NAME:
                description = 'Your first name (like "Ivan"):';
                pattern = /^[A-Z][a-z]+$/;
                message = 'Latin letters, capitalized';
                break;
            case DataKind.SURNAME:
                description = 'Your surname (like "Popov"):';
                pattern = /^[A-Z][a-z]+$/;
                message = 'Latin letters, capitalized';
                break;
            case DataKind.EMAIL:
                description = 'Your work email (connected to GitHub):';
                break;
            default:
                throw new Error(`Unknown dataKind '${dataKind}'`);
        }

        prompt.start();
        prompt.get(
            {
                properties: {
                    data: {
                        description,
                        pattern,
                        message,
                        type: 'string',
                        required: true,
                    },
                },
            },
            (error, result) => {
                if (result && result.data) {
                    resolve(result.data);
                } else {
                    reject(error);
                }
            }
        );
    });
}

configure().catch(() => console.warn('\n[WARN] Error occurred, config not finished\n'));
