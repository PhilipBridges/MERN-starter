import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import { Form, TextArea } from "informed";

class CommentForm extends React.Component {
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
    const { user } = this.props.auth;

    const newComment = {
      text: values.text,
      name: user.name,
    };
    this.props.addComment(newComment, this.props.postId);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">New Comment</div>
          <div className="card-body">
            <Form onSubmit={this.onSubmit} id="complex-form">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextArea
                  type="textfield"
                  className="form-control"
                  field="text"
                  id="text"
                />
                {errors.text && (
                  <div className="alert alert-primary">{errors.text}</div>
                )}
                <button className="btn btn-light" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(withRouter(CommentForm));
