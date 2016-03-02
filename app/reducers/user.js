import { SIGNUP, SIGNIN } from '../actions/user';


export default function currentUser(currentUser = {}, action) {
  switch (action.type) {
  case SIGNUP:
    return action.user
  case SIGNIN:
    return action.user
  default:
    return currentUser
  }
}
