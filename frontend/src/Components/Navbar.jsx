// This component holds all the top bar menu items

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    navItems: [
      { id: 1, name: "Home", value: "home", active: true },
      { id: 2, name: "Backend", value: "backend", active: false },
      { id: 3, name: "Frontend", value: "frontend", active: false },
      { id: 4, name: "ReactJS", value: "react", active: false },
      { id: 5, name: "JavaScript", value: "javascript", active: false },
      { id: 6, name: "HTML&CSS", value: "htmlcss", active: false },
      { id: 7, name: "UI Design", value: "uidesign", active: false }
    ]
  };
  componentDidMount() {
    let navItems = [...this.state.navItems];
    navItems.forEach(item => {
      if (window.location.pathname === "/") {
        navItems[0].active = true;
      } else if (
        `/${item.value}` === `/${window.location.pathname.split("/")[1]}`
      ) {
        item.active = true;
      } else item.active = false;
    });
    this.setState({ navItems });
  }
  navItemSelected = id => {
    let navItems = [...this.state.navItems];
    navItems.forEach(item => {
      if (item.id !== id) {
        item.active = false;
      } else item.active = true;
    });
    this.setState({ navItems });
  };

  render() {
    return (
      <div className="navbar">
        <li className="logo">Palmnotes Articles</li>
        <ul>
          {this.state.navItems.map(item => (
            <Link
              to={`/${item.value}`}
              key={item.id}
              onClick={() => this.navItemSelected(item.id)}
              name={item.value}
              className={item.active ? "active" : ""}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default Navbar;
