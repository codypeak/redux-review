import { RECEIVE_USERS } from '../actions/users';
import { ADD_POLL } from '../actions/polls';

export default function users (state={}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_POLL:  //when addPoll dispatched, will update the user slice of state also. 
            const poll = action.poll  //grab poll off of action
            const { author, id } = poll  //need info: author and id for the poll.

            return {
                ...state,  //spread in state that is the same
                [author]: {  //except for author, which is now prior author was with new poll concatenated to their poll property.
                    ...state[author],
                    polls: state[author].polls.concat([id])
                }
            }
        default:
            return state
    }
}