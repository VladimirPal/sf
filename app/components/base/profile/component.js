import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UserActions from '../../../actions/user';


const ProfileItem = React.createClass({
  render() {
    return (
      <li className="nav-header">
        <div className="profile-element">
          <span className="text-muted text-xs block">
          {Parse.User.current().get('email')}
          </span>
        </div>
      </li>
    );
  }
});

function mapStateToProps(state) {
  console.log(state);

  return {
    user: state.user
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
