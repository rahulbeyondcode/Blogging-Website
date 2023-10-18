import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import CardSection from "./CardSection";
import BlogView from "./BlogView";
import BlogEditor from "./BlogEditor";

const pathFinder = () => {
  return [
    "/backend",
    "/frontend",
    "/react",
    "/javascript",
    "/htmlcss",
    "/uidesign"
  ];
};

const Router = () => {
  return (
    <Switch>
      <Route
        exact
        path={"/backend"}
        render={() => <CardSection path="/backend" />}
      />

      <Route
        exact
        path={"/frontend"}
        render={() => <CardSection path="/frontend" />}
      />

      <Route
        exact
        path={"/react"}
        render={() => <CardSection path="/react" />}
      />

      <Route
        exact
        path={"/javascript"}
        render={() => <CardSection path="/javascript" />}
      />

      <Route
        exact
        path={"/htmlcss"}
        render={() => <CardSection path="/htmlcss" />}
      />

      <Route
        exact
        path={"/uidesign"}
        render={() => <CardSection path="/uidesign" />}
      />

      <Route exact path={"/home"} component={Home} />

      <Redirect exact path={"/"} to={"/home"} />

      <Route exact path={"/create-blog"} component={BlogEditor} />

      {pathFinder().map(path => (
        <Route
          key={path}
          exact
          path={`${path}/create-blog`}
          component={BlogEditor}
        />
      ))}

      {pathFinder().map(path => (
        <Route
          key={path}
          exact
          path={`${path}/:title/edit`}
          component={BlogEditor}
        />
      ))}

      {pathFinder().map(path => (
        <Route key={path} exact path={`${path}/:title`} component={BlogView} />
      ))}
    </Switch>
  );
};

export default Router;
