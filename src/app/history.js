import { store } from './index';
import { createHistory } from 'history';
import { useRouterHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

const
  historyFactory = process.browser ? createHistory : createMemoryHistory,
  platformHistory = useRouterHistory(historyFactory)({
    basename : process.env.PUBLIC_URL
  });


export const history = syncHistoryWithStore(platformHistory, store);
export default history;
