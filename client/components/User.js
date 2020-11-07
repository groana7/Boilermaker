import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { me, logout } from '../store/user';

class User extends React.Component {
  componentDidMount() {
    this.props.me();
  }
  render() {
    return (
      <div>
        <Login />
        <img src={this.props.user.imageUrl} />
        <p>Hello, {this.props.user.username}</p>
        <button onClick={() => this.props.logout()}>Logout</button>
      </div>
    );
  }
}

const mapState = (reduxState) => ({
  user: reduxState.user,
});

const mapDispatch = (dispatch) => ({
  me: () => dispatch(me()),
  logout: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(User);
