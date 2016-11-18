import { store } from './index';
import { createMemoryHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

const platformHistory = process.browser === true ? browserHistory : createMemoryHistory('/');

export const history = syncHistoryWithStore(platformHistory, store);
export default history;
