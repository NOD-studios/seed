/* eslint-disable fp/no-nil */
/* eslint-disable better/explicit-return */
import { errorLog } from '../'

//TODO: Implement a logger service
export const handleError = ( error, warning = false, extra = {} ) =>
  warning
    ? (() => {
      throw error
    }) ()
    : errorLog( error )


export default handleError
