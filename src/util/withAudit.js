//TODO: Publish
import { handleError } from '../'

export const withAudit = Parent => class extends Parent {

  get constructorName() {
    return this.displayName || this.constructor.name
  }

  get enabled() {
    const { DISABLE_AUDIT } = process.env
    return DISABLE_AUDIT !== true && DISABLE_AUDIT !== "true" && DISABLE_AUDIT !== "1"
  }

  handleError = handleError
  console = global.console || false

  get logInfo() {
    return this.console && this.console.info
      ? this.console.info
      : this.handleError(new Error(this.methodErrorText('info')))
  }

  get logTime() {
    return this.console && this.console.time
      ? this.console.time
      : this.handleError(new Error(this.methodErrorText('time')))
  }

  get logTimeEnd() {
    return this.console && this.console.timeEnd
      ? this.console.timeEnd
      : this.handleError(new Error(this.methodErrorText('timeEnd')))
  }

  mountText = `${ this.constructorName } mount time`
  updateText = `${ this.constructorName } update time`

  methodErrorText( method ) {
    return `Audit requires a console property with ${ method } method`
  }

  componentWillMount() {
    return this.enabled === true
      ? [
        this.logInfo(`${ this.constructorName } will mount with props :`, this.props ),
        this.logTime(this.mountText)
      ]
      : []
  }

  componentDidMount() {
    return this.enabled === true
      ? [
        this.logInfo(`${ this.constructorName } did mount with props :`,
            this.props),
        this.logTimeEnd(this.mountText)
      ]
      : []
  }

  componentWillUpdate() {
    return this.enabled === true
      ? [
        this.logInfo(`${ this.constructorName } will update with props :`,
            this.props),
        this.logTime(this.updateText)
      ]
      : []
  }

  componentDidUpdate() {
    return this.enabled === true
      ? [
        this.logInfo(`${ this.constructorName } did update with props :`,
            this.props),
        this.logTimeEnd(this.updateText)
      ]
      : []
  }

  componentWillUnmout() {
    return this.enabled === true
      ? [ this.logInfo(`${ this.constructorName } will unmount`) ]
      : []
  }

}

export default withAudit
