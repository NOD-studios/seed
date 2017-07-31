import debug from 'debug'

const DEFAULT_VALUE = Symbol('DEFAULT_VALUE')

export const noop = () => DEFAULT_VALUE

export const [ isBrowser, dom ] = typeof self !== 'undefined'
  ? typeof self.document !== 'undefined'
    ? [ true, self.document ]
    : [ false ]
  : typeof window !== 'undefined'
    ? typeof window.document !== 'undefined'
      ? [ true, window.document ]
      : [ false ]
    : [ false ]

export const valueOrDefaultValue = ( value, defaultValue ) =>
  typeof value !== 'undefined' && value !== DEFAULT_VALUE
      ? value
      : defaultValue

export const pipe = functions =>
    data =>
        functions.reduce( ( value, func ) =>
            valueOrDefaultValue( func( value ), value ), data )

export const thrower = error => { throw error } //eslint-disable-line

export const switchMapper = (expression, mapping = {}, defaultMap = noop ) =>
  value =>
    mapping[ expression ] || defaultMap

export const enableDebug = debug => {
  debug.enabled = true //eslint-disable-line
  return debug
}

export const autoDebug = (toLog, debug, descriptor = '') =>
  pipe([
    toLog => switchMapper(typeof toLog, {
      'object' : toLog =>
        isBrowser
          ? console.log( descriptor, toLog ) //eslint-disable-line
          : debug(`${ descriptor } %O`, toLog),
      'string' : toLog => debug(`${ descriptor } %s`, toLog),
      'number' : toLog => debug(`${ descriptor } %n`, toLog),
    }, toLog => debug(descriptor, toLog))(toLog),
    switchMap => switchMap(toLog),
    () => toLog
  ])( toLog )

export const log = (toLog, descriptor = '') =>
  autoDebug(toLog, enableDebug(debug(descriptor)))

export const errorLog = ::global.console.error

export * from './handleError'
export * from './Api'
export * from './database'
export * from './withAudit'
export * from './withProps'
export * from './withBoundActions'
