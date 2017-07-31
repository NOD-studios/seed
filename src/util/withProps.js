export const withProps = (Parent) => class extends Parent {

  constructor( userProps = {}, ...args ) { //eslint-disable-line
    const superReturn = super( ...args )
    const defaultProps = this.defaultProps || {}
    const props = Object.freeze({ ...defaultProps, ...this.props, ...userProps })

    return Object.assign( this, superReturn, { props }) //eslint-disable-line
  }
}

export default withProps
