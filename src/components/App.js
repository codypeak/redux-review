import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Poll from './Poll';

class App extends Component {
  //when component mounts want to invoke action creator (handleInitialData)
  componentDidMount () {
    this.props.dispatch(handleInitialData())  //will fetch initial data for app
  }

  render() {
    return (
      //if load dashboard before data returns then will get errors so use ternary.
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <Poll match={{params: {id: 'loxhs1bqm25b708cmbf3g'}}} /> }  
      </div>  
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null  //if authedUser is null app is still loading true
  }
}


export default connect(mapStateToProps)(App)
//export invocation of connect which gives back a function which we invoke passing component