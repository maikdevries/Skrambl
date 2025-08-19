import { chain } from '@maikdevries/server-router';
import { session } from '@maikdevries/server-sessions';

export default chain(session());
