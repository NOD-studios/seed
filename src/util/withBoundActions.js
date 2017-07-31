import { createElement } from 'react'
//TODO: Publish
import { bindActionCreators } from 'redux'

export const withBoundActions = actions =>
  Parent =>
    ({ dispatch, ...props }) =>
      createElement(Parent, {
        ...props,
        ...bindActionCreators( actions, dispatch )
      })

export default withBoundActions
