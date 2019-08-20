//combine all reducers into root reducer
import { combineReducers } from 'redux';

import authedUser from './autherUser';
import polls from './polls';
import users from './users';

export default combineReducers({
    authedUser,
    polls,
    users
})