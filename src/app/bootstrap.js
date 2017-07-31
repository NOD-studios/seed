import window from 'window-or-global'
import ReactDOM  from 'react-dom'
import { appRouter } from './'

export const bootstrap = (elementId = 'root') =>
  [ ReactDOM.render(appRouter(), window.document.getElementById(elementId)) ]
export default bootstrap
