import {
    JsonController,
    Get,
    Param,
    OnUndefined,
    Delete
} from 'routing-controllers';

import { Container } from '../../container';
import { container } from '../../containerCreate';

@JsonController('/user')
export class UserController {

    private readonly repository = container.resolve<Container['usersRepository']>('usersRepository');

    @Get('/')
    public async list(): Promise<any[]> {
        return this.repository.find();
    }

    @Get('/:id')
    @OnUndefined(404)
    public async one(@Param('id') id: number): Promise<any> {
        return this.repository.findOne(id);
    }

    @Delete('/:id')
    @OnUndefined(204)
    public async delete(@Param('id') id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
