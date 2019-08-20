import { savePoll } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'

function addPoll (poll) {
    return {
        type: ADD_POLL,
        poll
    }
}

//handle updating db by exporting action creator
export function handleAddPoll (poll) {
    //async so return action/function
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        //save new poll in db
        return savePoll({
            ...poll,
            author: authedUser
        })
        .then((poll) => dispatch(addPoll(poll)))  //get back newly formatted poll
        .then(() => dispatch(hideLoading()))
    }   
}


export function receivePolls (polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}