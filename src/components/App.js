import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';

class App extends Component {
  //when component mounts want to invoke action creator (handleInitialData)
  componentDidMount () {
    this.props.dispatch(handleInitialData())  //will fetch initial data for app
  }

  render() {
    return (
      <div>
        Starter Code.
      </div>
    )
  }
}

export default connect()(App)
//export invocation of connect which gives back a function which we invoke passing component