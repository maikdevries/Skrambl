import { chain } from '@maikdevries/server-router';

import type { Session } from '@maikdevries/server-sessions';
import { session } from '@maikdevries/server-sessions';

export interface BaseContext {
	'session': Session;
}

export default chain(session());
