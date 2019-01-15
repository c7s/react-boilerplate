import { Connection, createConnection, ConnectionOptions } from 'typeorm';
import { Container } from '../../container';

export class DatabaseConnector {
    private connection?: Connection;
    private config: ConnectionOptions = {} as any;

    constructor({ configBuilder }: Container) {
        this.config = configBuilder.getConfig<ConnectionOptions>('database');
    }

    public async connect(): Promise<void> {
        if (!this.connection) {
            this.connection = await createConnection(this.config);
        }
    }

    public async disconnect(): Promise<void> {
        if (this.connection && this.connection.isConnected) {
            await this.connection.close();

            this.connection = undefined;
        }
    }
}
