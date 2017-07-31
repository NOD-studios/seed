import Horizon from '@horizon/client'

export const connect = () => {
  const horizon = Horizon({
    host   : 'localhost',
    secure : true,
    port   : 8181
  })
  return ([ horizon.connect(), horizon ])[ 1 ]
}
export const hz = connect()
export const [ user ] = [ hz('users') ]
export default hz
