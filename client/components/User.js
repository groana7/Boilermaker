import React from 'react';
import { connect } from 'react-redux';

class User extends React.Component {
  render() {
    return (
      <div>
        <p>Hello, {this.props.user.name}</p>
      </div>
    );
  }
}

const mapState = (reduxState) => ({
  user: reduxState.user,
});

export default connect(mapState)(User);
