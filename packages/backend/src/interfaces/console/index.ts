import { start } from './Console';
import { container } from '../../containerCreate';

start({
  expose: { container }
});
