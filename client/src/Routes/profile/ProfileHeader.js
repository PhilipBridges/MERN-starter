import React, { Component } from "react";
import { isEmpty } from "../../utils";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={`https://${profile.website}`}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-sm" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={`https://${profile.social.twitter}`}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-sm" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={`https://${profile.social.facebook}`}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-sm" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={`https://${profile.social.linkedin}`}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-sm" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={`https://${profile.social.youtube}`}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-sm" />
                  </a>
                )}

              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
