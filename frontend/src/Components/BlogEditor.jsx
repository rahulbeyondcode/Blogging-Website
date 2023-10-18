import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../Utils/CommonComponents/Input";

class BlogEditor extends Component {
  state = {
    author: "",
    blogText: "",
    blogTitle: "",
    category: "",
    cardDescription: "",
    editMode: false,
    id: "",
    phoneNumber: ""
  };
  componentDidMount() {
    if (window.location.pathname.split("/").includes("edit")) {
      this.setState(
        { editMode: true, category: window.location.pathname.split("/")[1] },
        () => {
          if (this.props.getAllBlogs.data.length) {
            this.findDocToEdit();
          } else {
            this.props.fetchArticleData(window.location.pathname.split("/")[1]);
          }
        }
      );
    } else {
      const category =
        window.location.pathname.split("/")[1] !== "create-blog"
          ? window.location.pathname.split("/")[1]
          : "";
      this.setState({ category, editMode: false });
    }
  }

  findDocToEdit = () => {
    const secondID = window.location.pathname.split("/")[2];
    const docToEdit = this.props.getAllBlogs.data.filter(
      blog => blog.secondID === secondID
    )[0];

    this.setState({
      author: docToEdit.author,
      blogText: docToEdit.blogText,
      blogTitle: docToEdit.blogTitle,
      category: docToEdit.category,
      cardDescription: docToEdit.cardDescription,
      id: docToEdit._id,
      phoneNumber: docToEdit.phoneNumber
    })
  };

  handleChangeCategory = event => {
    this.setState({ category: event.target.value });
  };

  submitBlog = () => {
    const {
      author,
      phoneNumber,
      blogTitle,
      category,
      blogText,
      cardDescription
    } = this.state;

    if (author && phoneNumber && blogTitle && category && blogText && cardDescription) {

      const payload = {
        author,
        blogText,
        blogTitle,
        category,
        cardDescription,
        phoneNumber
      }

      this.state.editMode ? this.props.editBlog(this.state.id, payload) : this.props.createBlog(payload);
    }
  };

  componentDidUpdate(props) {
    if (props.getAllBlogs.data !== this.props.getAllBlogs.data && this.props.getAllBlogs.data.length) {
      this.findDocToEdit()
    }
  }

  render() {
    const {
      author,
      phoneNumber,
      blogTitle,
      category,
      blogText,
      cardDescription
    } = this.state;
    console.log("here")
    return (
      <div className="create-blog">
        <p className="create-blog-header">
          {this.state.editMode ? "Edit the Article" : "Add New Article"}
        </p>
        <div className="create-blog-form">
          <div className="align-form">
            <label htmlFor="blog-author">Author Name</label>
            <Input
              type="text"
              name="blog-author"
              placeholder="Enter some text"
              required
              height="35px"
              defaultValue={this.state.author}
              getValue={value => this.setState({ author: value })}
            />
          </div>

          <div className="align-form">
            <label htmlFor="phone-number">Phone Number</label>

            <Input
              type="text"
              name="phone-number"
              placeholder="Enter some text"
              required
              height="35px"
              defaultValue={this.state.phoneNumber
              }
              getValue={value => this.setState({ phoneNumber: value })}
            />
          </div>
          <div className="align-form">
            <label htmlFor="blog-title">Title of your blog</label>

            <Input
              type="text"
              name="blog-title"
              placeholder="Enter some text"
              required
              height="35px"
              defaultValue={this.state.blogTitle
              }
              getValue={value => this.setState({ blogTitle: value })}
            />
          </div>

          <div className="align-form">
            <label htmlFor="card-description">Card Description</label>

            <Input
              type="text"
              name="card-description"
              placeholder="Enter some text"
              required
              height="35px"
              defaultValue={this.state.cardDescription
              }
              getValue={value => this.setState({ cardDescription: value })}
            />
          </div>

          <div className="align-form">
            <label htmlFor="blog-category">Category</label>
            <select
              onChange={event => this.handleChangeCategory(event)}
              name="blog-category"
              value={this.state.category}
            >
              <option disabled value="">
                Please select a category
              </option>
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
              <option value="react">ReactJS</option>
              <option value="javascript">JavaScript</option>
              <option value="htmlcss">HTML&CSS</option>
              <option value="uidesign">UI Design</option>
            </select>
          </div>

          <div className="align-form">
            <label htmlFor="blog-data">Start typing your blog</label>

            <Input
              type="textarea"
              name="blog-data"
              placeholder="Enter some text"
              required
              height="135px"
              defaultValue={this.state.blogText
              }
              getValue={value => this.setState({ blogText: value })}
            />
          </div>

          <button
            disabled={
              !author.trim() ||
              !phoneNumber.trim() ||
              !blogTitle.trim() ||
              !category.trim() ||
              !blogText.trim() ||
              !cardDescription.trim()
            }
            className="create-blog-btn"
            onClick={() => this.submitBlog()}
          >
            {this.state.editMode ? "Save Blog" : "Create Blog"}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllBlogs: state.getAllBlogs
});
const mapDispatchToProps = dispatch => ({
  fetchArticleData: data =>
    dispatch({
      type: "GET_ALL_BLOG",
      payload: data
    }),
  editBlog: (id, payload) =>
    dispatch({
      type: "EDIT_BLOG",
      payload,
      id
    }),
  createBlog: (payload) =>
    dispatch({
      type: "CREATE_BLOG",
      payload
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogEditor);
