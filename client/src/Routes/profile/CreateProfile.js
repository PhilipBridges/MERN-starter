import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profileActions";
import { Form, Text, TextArea } from "informed";

class CreateProfile extends React.Component {
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
    this.props.createProfile(values, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>CreateProfile</h1>
        <div className="CreateProfile">
          <div className="container">
            <div className="row">
              <div className="col-md-4 m-auto">
                <Form onSubmit={this.onSubmit} id="complex-form">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="handle">Username</label>
                    <Text className="form-control" field="handle" id="handle" />
                    {errors.handle && (
                      <div className="alert alert-primary">{errors.handle}</div>
                    )}
                    <label htmlFor="website">Website</label>
                    <Text
                      className="form-control"
                      field="website"
                      id="website"
                    />
                    {errors.website && (
                      <div className="alert alert-primary">
                        {errors.website}
                      </div>
                    )}
                    <label htmlFor="location">Location</label>
                    <Text
                      type="text"
                      className="form-control"
                      field="location"
                      id="location"
                    />
                    {errors.location && (
                      <div className="alert alert-primary">
                        {errors.location}
                      </div>
                    )}
                    <label htmlFor="bio">Bio</label>
                    <TextArea
                      type="textfield"
                      className="form-control"
                      field="bio"
                      id="bio"
                    />
                    {errors.bio && (
                      <div className="alert alert-primary">{errors.bio}</div>
                    )}
                    <label htmlFor="twitter">Twitter</label>
                    <Text
                      type="text"
                      className="form-control"
                      field="twitter"
                      id="twitter"
                    />
                    {errors.twitter && (
                      <div className="alert alert-primary">
                        {errors.twitter}
                      </div>
                    )}
                    <label htmlFor="facebook">Facebook</label>
                    <Text
                      type="text"
                      className="form-control"
                      field="facebook"
                      id="facebook"
                    />
                    {errors.facebook && (
                      <div className="alert alert-primary">
                        {errors.facebook}
                      </div>
                    )}
                    <label htmlFor="linkedin">Linkedin</label>
                    <Text
                      type="text"
                      className="form-control"
                      field="linkedin"
                      id="linkedin"
                    />
                    {errors.linkedin && (
                      <div className="alert alert-primary">
                        {errors.linkedin}
                      </div>
                    )}
                    <label htmlFor="youtube">Youtube</label>
                    <Text
                      type="text"
                      className="form-control"
                      field="youtube"
                      id="youtube"
                    />
                    {errors.youtube && (
                      <div className="alert alert-primary">
                        {errors.youtube}
                      </div>
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
