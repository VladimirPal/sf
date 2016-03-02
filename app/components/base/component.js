import React from 'react';

import SidebarComponent from './sidebar/component';
import ContentComponent from './content/component';
import SpinnerComponent from './spinner/component';


export default React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render() {
    let currentUser = Parse.User.current();

    return (
      <div id='wrapper'>
        {currentUser &&
        <SidebarComponent/>
        }
        <ContentComponent
          mainPage={this.props.children}/>
      </div>
    );
  }
});
