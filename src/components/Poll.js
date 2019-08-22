import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPercentage } from '../utils/helpers';
import { handleAddAnswer } from '../actions/answers';

const getVoteKeys = () => ['aVotes', 'bVotes', 'cVotes', 'dVotes']

class Poll extends Component {
    handleAnswer = (answer) => {
        const { poll, authedUser }= this.props
        this.answered = true
        this.props.dispatch(handleAddAnswer({
            authedUser,
            answer,
            id: poll.id,
        }))
    }

    render() {
        if (this.props.poll === null) {
            return <p>This poll does not exist</p>
        }

        const { poll, vote, authorAvatar } = this.props

        //loop over all votes and reduce to single value
        const totalVotes = getVoteKeys()
            .reduce((total, key) => total + poll[key].length, 0)  //start at 0 and increment up total by whatever next option's length is.

        return (
            <div className='poll-container'>
                <h1>
                    {poll.question}
                </h1>
                <div className='poll-author'>
                    By <img src={authorAvatar} alt="Author's Avatar" />
                </div>
                <ul>
                    {['aText', 'bText', 'cText', 'dText'].map((key) => {
                        const count = poll[key[0] + 'Votes'].length
                        return (
                            <li 
                                key={key}
                                onClick={() => {
                                    if (vote === null && !this.answered) {//can only vote if havent yet, so if vote null& not answered yet b/c few microsecond delay.
                                        this.handleAnswer(key[0])
                                    }
                                }}
                                className={`option ${vote === key[0] ? 'chosen' : '' }`}>
                                    {vote === null
                                    ? poll[key]
                                    : <div className='result'>
                                        <span>{poll[key]}</span>
                                        <span>{getPercentage(count, totalVotes)}% ({count})</span>
                                    </div>}
                            </li>
                        )
                    })}
                </ul>
            </div>
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
    const vote = getVoteKeys().reduce((vote, key) => {
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