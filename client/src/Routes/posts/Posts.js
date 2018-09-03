import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import Spinner from "../../components/custom/Spinner";
import Feed from './Feed'

import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <Feed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 align-items-center">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
