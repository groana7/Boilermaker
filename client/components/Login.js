import React from 'react';
import { connect } from 'react-redux';
import { login } from '../store/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.login(this.state);
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <button type="submit">Login</button>
        </form>
        <form method="get" action="/auth/google">
          <button type="submit">Login with Google</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  login: (body) => dispatch(login(body)),
});

export default connect(null, mapDispatch)(Login);
