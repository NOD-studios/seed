import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Jumbotron, Label } from 'reactstrap'
import { withAudit, AppLoader, AppRowSpacer } from '../index'

export class Welcome extends withAudit(PureComponent) {

  static propTypes = {
    fetchingIp       : PropTypes.bool.isRequired,
    fetchingIpError  : PropTypes.object.isRequired,
    fetchingIpResult : PropTypes.shape({
      origin : PropTypes.string
    })
  }

  componentWillMount() {
    const { fetchIp } = this.props

    return fetchIp()
  }

  componentWillUnmount() {
    const { cancelFetchingOfIp } = this.props

    return cancelFetchingOfIp()
  }

  render() {
    const { fetchingIpResult: { origin }, fetchingIp } = this.props

    return (
      <Jumbotron className="text-xs-center">

        <h1 className="display-4">Welcome</h1>

        <AppRowSpacer />

        { fetchingIp === true ? <AppLoader /> : undefined }

        { origin && <p className="lead">
          Your IP address is <Label color="info">{ origin }</Label>
        </p> }

      </Jumbotron>
    )

  }

}

export default Welcome
