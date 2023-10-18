// In this component each blog is rendered as openable cards.

import React from "react";

const Card = props => {
  return (
    <div onClick={() => props.showBlog(props.heading)} className="card">
      <p className="heading">{props.heading}</p>
      <p className="description">{props.description}</p>
    </div>
  );
};

export default Card;
