import window from 'window-or-global';
import ReactDOM  from 'react-dom';
import { router } from '../index';

export const bootstrap = (elementId = 'root') => ReactDOM
  .render(router(), window.document.getElementById(elementId));

export default bootstrap;
