import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_2: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, first_name, last_name, email, password, password_2 } = this.state;

    const newUser = {
      username,
      first_name,
      last_name,
      email,
      password,
      password_2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="First Name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Last Name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password_2"
                  type="password"
                  value={this.state.password_2}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { registerUser })(Register);
