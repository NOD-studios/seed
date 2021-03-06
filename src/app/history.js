import { createHistory } from 'history';
import { useRouterHistory, createMemoryHistory } from 'react-router';

const historyFactory = process.browser ? createHistory : createMemoryHistory;

export const history = useRouterHistory(historyFactory)({
  basename : process.env.PUBLIC_URL
});

export default history;

