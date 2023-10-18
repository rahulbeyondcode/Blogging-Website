import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from 'react-awesome-modal';

import findDate from "../Utils/FindDate";
import Blog from "./Blog";

class BlogView extends Component {
  state = {
    blogToShow: [],
    blogID: "",
    modalVisible: false
  };
  componentDidMount() {
    if (this.props.getAllBlogs.data.length) {
      this.showBlog();
    } else {
      this.props.fetchBlog(this.props.match.path.split("/")[1]);
    }
  }
  showBlog = () => {
    const { getAllBlogs, match } = this.props;
    this.setState({
      blogToShow: [
        getAllBlogs.data.filter(
          blog => blog.secondID === match.url.split("/")[2]
        )[0]
      ]
    }, () => this.setState({
      blogID: this.state.blogToShow && this.state.blogToShow[0] && this.state.blogToShow[0]._id
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.getAllBlogs.data !== this.props.getAllBlogs.data) {
      this.showBlog();
    }
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }
  openModal = () => {
    this.setState({ modalVisible: true })
  }


  render() {
    return (
      <div>
        <div className="author-and-cta-btn">
          {!!this.state.blogToShow[0] &&
            this.state.blogToShow.map(blog => (
              <div key={blog._id}>
                <p>
                  Author: <span className="bold"> {blog.author} </span>{" "}
                </p>
                <p>
                  Published on{" "}
                  <span className="bold">
                    {" "}
                    {findDate(blog.createdAt, "dd-mm-yyyy", true)}
                  </span>
                </p>
                <p>
                  Last Modified on{" "}
                  <span className="bold">
                    {" "}
                    {findDate(blog.createdAt, "dd-mm-yyyy", true)}
                  </span>
                </p>
              </div>
            ))}
          {this.state.blogID && (
            <div className="cta-holder">
              <button
                onClick={() =>
                  this.props.history.push(`${window.location.pathname}/edit`)
                }
                className="btn edit-btn"
              >
                <i className="fas fa-edit"></i> Edit
            </button>
              <button onClick={() => this.openModal()}
                className="btn delete-btn"
              >
                <i className="fas fa-trash-alt"></i> Delete
            </button>
            </div>)}
        </div>
        <Modal
          visible={this.state.modalVisible}
          width="500"
          height="200"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="modalStyles">
            <p className="modaltitle">Are you sure you want to delete the blog?</p>
            <p className="modalSubtitle">You cannot undo this action. Proceed if you are sure.</p>
            <div className="modalButtonsHolder">
              <button
                className="modal-btn cta-cancel"
                onClick={() => this.closeModal()}
              >
                Close
              </button>
              <button
                className="modal-btn cta-delete"
                onClick={() => {
                  this.props.deleteBlog(this.state.blogID);
                  this.closeModal();

                }}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
        {this.state.blogToShow[0] && <Blog blog={this.state.blogToShow} />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  getAllBlogs: state.getAllBlogs
});

const mapDispatchToProps = dispatch => ({
  fetchBlog: data =>
    dispatch({
      type: "GET_ALL_BLOG",
      payload: data
    }),
  deleteBlog: (id) =>
    dispatch({
      type: "DELETE_BLOG",
      payload: id
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView);
