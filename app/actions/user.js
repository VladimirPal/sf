export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';


export function signUp(userData) {
  let user = new Parse.User(userData);
  return dispatch => {
    return user.signUp(null,
      {
        success: (user) => {
          return dispatch( (() => {
            return {
              type: SIGNUP,
              user: user
            };
          })())
        },
      }
    );
  }
}

export function signIn(email, password) {
  return dispatch => {
    return Parse.User.logIn(email, password,
      {
        success: (user) => {
          return dispatch( (() => {
            return {
              type: SIGNIN,
              user: user
            };
          })())
        },
        error: () => {
          return dispatch( (() => {
            return {
              type: SIGNIN,
              user: false
            };
          })())
        },
      }
    );
  }
}
