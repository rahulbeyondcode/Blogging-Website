import React from "react";
import Navbar from "./Components/Navbar";
import Router from "./Components/Router";
import { withRouter } from "react-router-dom";

function App(props) {
  const errorCondition1 = !window.location.pathname
    .split("/")
    .includes("create-blog");
  const errorCondition2 = !(window.location.pathname.split("/").length > 2);
  const shouldCreateButtonShow = errorCondition1 && errorCondition2;
  return (
    <>
      <div className="home-page">
        <Navbar />
        <div className="avoid-header">
          <Router />
        </div>
      </div>
      {shouldCreateButtonShow && (
        <div
          onClick={() =>
            props.history.push(
              `${
              window.location.pathname !== "/home"
                ? window.location.pathname
                : ""
              }/create-blog`
            )
          }
          className="add-blog-button"
        >
          +
        </div>
      )}
    </>
  );
}

export default withRouter(App);
