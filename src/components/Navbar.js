import React, { Component } from "react";

export default class PostsList extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">HN feed</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#all">Show All</a></li>
            <li><a href="#unread">Show Unread</a></li>
            <li><a href="#read">Show Read</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}
