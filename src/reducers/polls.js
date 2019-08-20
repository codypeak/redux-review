import { RECEIVE_POLLS, ADD_POLL } from '../actions/polls';

//reducer always takes in state and action. the state object is default parameters.
export default function polls (state = {} , action) {
    switch (action.type) {
        case RECEIVE_POLLS:
            return {
                ...state,
                ...action.polls,
            }
        case ADD_POLL: 
            return {
                ...state,
                [action.poll.id]: action.poll,
            }  //return brand new object b/c has to be pure function. add the new poll to the existing spread in state.
        default:
            return state
    }
}