// All the openable blog cards are rendered in this component

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { NotificationContainer, NotificationManager } from "react-notifications";

import Card from "./Card";
import RingLoader from "react-spinners/RingLoader";

const override = `
  display: block;
  margin: auto auto;
  border-color: #50c113;
`;

class CardSection extends Component {
  state = {
    path: window.location.pathname,
    cards: []
  };
  componentDidMount() {
    if (Cookies.get("deleted") === "true") {
      NotificationManager.success('Blog was deleted successfully', 'Done!');
      Cookies.remove("deleted")
    }
    if (Cookies.get("created") === "true") {
      NotificationManager.success('New blog was created successfully', 'Done!');
      Cookies.remove("created")
    }
    if (Cookies.get("updated") === "true") {
      NotificationManager.success('Your blog has been updated!', 'Done!');
      Cookies.remove("updated")
    }

    this.props.updateCards(this.state.path.split("/")[1]);
  }

  static getDerivedStateFromProps(props, state) {
    let stateUpdates = {};
    if (props.path !== state.path) {
      stateUpdates.path = props.path;
    }
    if (props.getAllBlogs.data !== state.cards) {
      stateUpdates.cards = props.getAllBlogs.data;
    }
    return Object.keys(stateUpdates).length ? stateUpdates : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path)
      this.props.updateCards(this.state.path.split("/")[1]);
  }

  viewBlogInDetail = title => {
    this.props.history.push(`${window.location.pathname}/${title.split(" ").join("-").toLowerCase()}`)
  };

  render() {
    const { getAllBlogs } = this.props;
    return (
      <div className="articles">
        <NotificationContainer />
        {getAllBlogs && getAllBlogs.fetching ? (
          <RingLoader
            css={override}
            sizeUnit={"px"}
            size={75}
            color={"#50c113"}
          />
        ) : (
            getAllBlogs.error && Object.keys(getAllBlogs.error).length ? <p className="error-messages">{getAllBlogs.error}</p> :
              this.state.cards.length > 0 ?
                (
                  this.state.cards.map(card => (
                    <Card
                      key={card._id}
                      showBlog={title => this.viewBlogInDetail(title)}
                      id={card._id}
                      heading={card.blogTitle}
                      description={card.cardDescription}
                    />
                  ))
                ) : (
                  <p className="error-messages">Sorry, Currently there are no blogs under this section.</p>
                ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getAllBlogs: state.getAllBlogs
});
const mapDispatchToProps = dispatch => ({
  updateCards: data => dispatch({ type: "GET_ALL_BLOG", payload: data })
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CardSection));
