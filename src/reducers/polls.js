import { RECEIVE_POLLS } from '../actions/polls';

//reducer always takes in state and action. the state object is default parameters.
export default function polls (state = {} , action) {
    switch (action.type) {
        case RECEIVE_POLLS:
            return {
                ...state,
                ...action.polls,
            }
        default:
            return state
    }
}