import React from 'react';
import { connect } from 'react-redux';

//good strategy with redux is to have heavy lifting/formatting done in mstp so that component can just map over it to render

function Leaderboard ({ users }) {
   return (
       <ul>
        {users.map((user) => (
            <li className='user' key={user.id}>
                <img src={user.avatarURL} alt={`${user.name}`}/>
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.polls} Polls</p>
                    <p>{user.answers} Answers</p>
                </div>
            </li>
        ))}
       </ul>
   )
}

function mapStateToProps ({ users }) {  //getting users from store
    return {
        users: Object.keys(users)  //users is array so use object.keys
            .map((id) => {  //for each user inside users obj we will get id, which allows us to get other properties.
                const { name, avatarURL, polls, answers } = users[id] 
            //want to return object that will have info we need for leaderboard UI.
            return {
                id, 
                name, 
                avatarURL, 
                polls: polls.length, 
                answers: answers.length  //want number of polls and answers so use length
            }
        }) 
        .sort((a,b) => b.polls + b.answers > a.polls + a.answers)  //sorts users by most polls and answers
    } 
}

export default connect(mapStateToProps)(Leaderboard);