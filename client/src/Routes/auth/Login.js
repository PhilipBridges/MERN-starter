import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Form, Text } from "informed";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.authed) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authed) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(values) {
    this.props.loginUser(values, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div className="Login">
          <div className="container">
            <div className="row">
              <div className="col-md-4 m-auto">
                <Form onSubmit={this.onSubmit} id="complex-form">
                  {({ formApi }) => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="email">Email</label>
                      <Text className="form-control" field="email" id="email" />
                      {errors.email && (
                        <div className="alert alert-primary">
                          {errors.email}
                        </div>
                      )}
                      <label htmlFor="complex-friend-1">Password</label>
                      <Text
                        type="password"
                        className="form-control"
                        field="password"
                        id="password"
                      />
                      {errors.password && (
                        <div className="alert alert-primary">
                          {errors.password}
                        </div>
                      )}

                      <button className="btn btn-light" type="submit">
                        Submit
                      </button>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
