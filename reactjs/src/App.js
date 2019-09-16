import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import BookController from "./scenes/books/components/BookController";
import Notification from "./components/notification/notification";
import { connect } from "react-redux";
import notificationConstants from "./constants/notification.constants";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import { history } from "./helpers/history";
// user lazy if our project have more components
//const BookController = React.lazy(() => import("./scenes/books/components/BookController"));
function App(props) {
  let notification = props.notification;
  if (notification.message) {
    //clear notification after 30 seconds
    setTimeout(() => {
      props.dispatch({ type: notificationConstants.CLEAR });
    }, 6000);
  }
  return (
    <>
      {notification.message ? (
        <Notification
          action={notification.type}
          message={notification.message}
        />
      ) : null}
      <Router history={history}>
        <Switch>
          <Route
            key={"list"}
            exact
            path="/"
            component={e => (
              <ErrorBoundary>
                <BookController {...e} action="list" />
              </ErrorBoundary>
            )}
          />
          <Route
            key={"list"}
            exact
            path="/books"
            component={e => (
              <ErrorBoundary>
                <BookController {...e} action="list" />
              </ErrorBoundary>
            )}
          />
          <Route
            key={"add"}
            path="/books/add"
            component={e => (
              <ErrorBoundary>
                <BookController {...e} action="add" />
              </ErrorBoundary>
            )}
          />
          <Route
            key={"edit"}
            path="/books/edit/:id"
            component={e => (
              <ErrorBoundary>
                <BookController {...e} action="edit" />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

function mapStateToProps(state) {
  const { notification } = state;
  return {
    notification
  };
}

const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;
