import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Form, Text } from "informed";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(values) {
    this.props.registerUser(values, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-4 m-auto">
                <Form onSubmit={this.onSubmit} id="complex-form">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="name">Name</label>
                      <Text className="form-control" field="name" id="name" />
                      {errors.name && (
                        <div className="alert alert-primary">{errors.name}</div>
                      )}
                      <label htmlFor="email">Email</label>
                      <Text className="form-control" field="email" id="email" />
                      {errors.email && (
                        <div className="alert alert-primary">{errors.email}</div>
                      )}
                      <label htmlFor="complex-friend-1">Password</label>
                      <Text
                        type="password"
                        className="form-control"
                        field="password"
                        id="password"
                      />
                      {errors.password && (
                        <div className="alert alert-primary">{errors.password}</div>
                      )}
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Text
                        type="password"
                        className="form-control"
                        field="confirmPassword"
                        id="confirmPassword"
                      />
                      {errors.confirmPassword && (
                        <div className="alert alert-primary">{errors.confirmPassword}</div>
                      )}
                      <button className="btn btn-light" type="submit">
                        Submit
                      </button>
                    </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
