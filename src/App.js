import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";
import { IonApp, IonSplitPane, IonPage, IonRouterOutlet } from "@ionic/react";
import PageOne from "./pages/PageOne";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import PageOneDetail from "./pages/PageOneDetail";
import PageTwo from "./pages/PageTwo";
import Menu from "./components/Menu";

import { useAuth } from "./authHook";

import { AuthProvider, AuthConsumer } from "./components/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  debugger
  return (
    <AuthConsumer>
      {({ isAuth }) => (
        <Route
          render={props =>
            rest.user ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/page-login",
                  state: { from: props.location }
                }}
              />
            )
          }
          {...rest}
        />
      )}
    </AuthConsumer>
  );
};

export default function App() {
  const { initializing, user } = useAuth();

  const renderRoot = isAuth => {
    console.log(isAuth);
    return (
      <IonApp>
        <IonSplitPane contentId="main">
          <Menu disabled={false} />
          <IonPage id="main">
            <PrivateRoute
              exact
              path="/"
              render={() => <Redirect to="/page-one" />}
            />
            <IonRouterOutlet>
              <Route path="/page-login" component={LoginPage} />
              <Route
                path="/page-create-account"
                component={CreateAccountPage}
              />
              <PrivateRoute path="/page-one" component={PageOne} />
              <PrivateRoute path="/page-one-detail" component={PageOneDetail} />
              <PrivateRoute path="/page-two" component={PageTwo} />
            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    );
  };

  return (
    <>
      {initializing ? (
        <div>Loading</div>
      ) : (
        <Router>
          <AuthProvider>
            <AuthConsumer>
              {({ setAuthenticated }) => {
                console.log(user);
                // setAuthenticated(user !== null);
                return (
                  <IonApp>
                    <IonSplitPane contentId="main">
                      <Menu disabled={false} />
                      <IonPage id="main">
                        <PrivateRoute
                          user={user}
                          exact
                          path="/"
                          render={() => <Redirect to="/page-one" />}
                        />
                        <IonRouterOutlet>
                          <Route path="/page-login" component={LoginPage} />
                          <Route
                            path="/page-create-account"
                            component={CreateAccountPage}
                          />
                          <PrivateRoute
                            user={user}
                            path="/page-one"
                            component={PageOne}
                          />
                          <PrivateRoute
                            user={user}
                            path="/page-one-detail"
                            component={PageOneDetail}
                          />
                          <PrivateRoute
                            user={user}
                            path="/page-two"
                            component={PageTwo}
                          />
                        </IonRouterOutlet>
                      </IonPage>
                    </IonSplitPane>
                  </IonApp>
                );
              }}
            </AuthConsumer>
          </AuthProvider>
        </Router>
      )}
    </>
  );
}
