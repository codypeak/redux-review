import React, { Component } from 'react';
import { connect } from 'react-redux';

class Poll extends Component {
    render() {
        return (

        )
    }
}

//grab what need from store, but also use second arg of current props, ie match object
function mapStateToProps ({ authedUser, polls, users}, { match }) {
    //use match.params to get id of current poll user is viewing
    const { id } = match.params
    const poll = polls[id]

    if (!poll) {
        return {
            poll: null
        }
    }
    //reduce array down to just the one that was voted for
    const vote = ['aVotes', 'bVotes', 'cVotes', 'dVotes'].reduce((vote, key) => {
        if (vote !== null) {
            return vote[0]  //vote at 0 b/c that just returns the first letter of the choice
        }
        return poll[key].includes(authedUser)
            ? key
            : vote
    }, null)

    return {
        poll,
        vote,
        authedUser,
        authorAvatar: users[poll.author].avatarURL
    }
}

export default connect(mapStateToProps)(Poll);