import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receivePolls } from './polls';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'dan_abramov';  //fake user authentication b/c no real auth or backend, comes from DATA.js

export function handleInitialData () {
    //when have access to dispatch can make async request
    return (dispatch) => {
        dispatch(showLoading())
        //invoke function, returns a promise, when promise resolves get object back with user and poll properties.
        return getInitialData() 
        //then dispatch action.  put polls in store.
            .then(({ users, polls }) => {
                dispatch(receiveUsers(users))
                dispatch(receivePolls(polls))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}