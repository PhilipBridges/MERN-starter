import React, { Component } from "react";

export default class ProfileBio extends Component {
  render() {
    const { bio } = this.props
    return (
      <div className="card">
        <div className="card-header">Bio</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              {bio}
            </p>
          </blockquote>
        </div>
      </div>
    );
  }
}
