import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileBio from "./ProfileBio";
import Spinner from "../../components/custom/Spinner";

import { getProfileByHandle } from "../../actions/profileActions";

export class FullProfile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
  };
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/notfound");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let renderContent;

    if (profile === null || loading) {
      renderContent = <Spinner />;
    } else {
      renderContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link className="btn btn-light mb-3 float-left" to="/profiles">
                Back
              </Link>
            </div>
          </div>
          <div className="col-md-12">
            <ProfileHeader profile={profile} />
            <ProfileBio bio={profile.bio} />
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>{renderContent}</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(FullProfile);
