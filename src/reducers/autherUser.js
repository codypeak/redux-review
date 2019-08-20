import { SET_AUTHED_USER } from '../actions/authedUser';

//if state is null here it means we havent fetched user data yet
export default function authedUser (state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id  //id of user added to state so no if authenticated
        default:
            return state
    }
}