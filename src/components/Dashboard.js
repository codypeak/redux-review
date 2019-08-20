import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    //this is just component state. never used elsewhere, so doesnt need to be on store. 
    state = {
        showAnswered: false,
    }
    //to toggle view rendered
    showUnanswered = () => {
        this.setState(() => ({
            showAnswered: false
        }))
    }
    showAnswered = () => {
        this.setState(() => ({
            showAnswered: true
        }))
    }
    
    render() {
        const { showAnswered } = this.state
        const { answered, unanswered } = this.props  //props coming from mstp
        const list = showAnswered === true ? answered : unanswered

        return (
            <div>
                <div className='dashboard-toggle'>
                    <button
                        style={{textDecoration: showAnswered === false ? 'underline' : null }}
                        onClick={this.showUnanswered} >
                        Unanswered
                    </button>
                    <span> | </span>
                    <button
                        style={{textDecoration: showAnswered === true ? 'underline' : null }}
                        onClick={this.showAnswered} >
                        Answered
                    </button>
                </div>
                <ul className='dashboard-list'>
                    {list.map((poll) => (
                        <li key={poll.id}>
                            {poll.question}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

//accessing three pieces of state from redux store
function mapStateToProps ({ authedUser, polls, users }) {
    const answers = users[authedUser].answers //user at authUsers. users have an array of answer id's.
    //can map over all answers. for each answer in array have id. to get actual polls map over answers and ref the polls by id then sort by time stamp.
    const answered = answers.map((id) => polls[id])
        .sort((a,b) => b.timestamp - a.timestamp)
    
    const unanswered = Object.keys(polls) //will return an array with all of the polls
        //then filter all polls by id. answers does not include these polls, ie if id of poll is not included in user answers array.
        .filter((id) => !answers.includes(id))
        //map to get specific poll
        .map((id) => polls[id])
        //then sort by time
        .sort((a,b) => b.timestamp - a.timestamp)

    //now can return object with both answered and unanswered polls    
    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Dashboard);