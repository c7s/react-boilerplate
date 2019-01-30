import {
    JsonController,
    Get,
    Param,
    OnUndefined,
} from 'routing-controllers';

import { Container } from '../../container';
import { container } from '../../containerCreate';

@JsonController('/user')
export class UserController {

    private readonly repository: Container['usersRepository'] = container.resolve('usersRepository');

    @Get('/')
    public async list(): Promise<any[]> {
        return this.repository.find();
    }

    @Get('/:id')
    @OnUndefined(404)
    public async one(@Param('id') id: number): Promise<any> {
        return this.repository.findOne(id);
    }
}
