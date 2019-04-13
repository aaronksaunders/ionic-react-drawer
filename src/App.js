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

import firebaseService from "./firebase";

import { AuthProvider, AuthConsumer } from "./components/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={props =>
          isAuth ? (
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

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [authState, setAuthState] = useState({
    auth: false,
    loaded: false
  });

  useEffect(() => {
    // if (authState.loaded) return
    let x = firebaseService.isInitialized().then(v => {
      debugger;

      if (v) {
        setAuthState({ auth: true, loaded: true });
      } else {
        setAuthState({ auth: false, loaded: true });
      }
      console.log(authState);
    });
  }, [authState.auth]);

  const renderunAuth = setAuthenticated => {
    debugger;
    setAuthenticated(false);
    return (
      <IonApp>
          <IonPage id="main">
            <Route
              exact
              path="/"
              render={() => <Redirect to="/page-login" />}
            />
            <IonRouterOutlet>
              <Route path="/page-login" component={LoginPage} />
              <Route path="/page-create-account" component={CreateAccountPage} />
            </IonRouterOutlet>
          </IonPage>
      </IonApp>
    );
  };
  const renderRoot = setAuthenticated => {
    debugger;
    setAuthenticated(true);
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
      {!authState.loaded ? null : (
        <Router>
          <AuthProvider>
            <AuthConsumer>
              {({ setAuthenticated }) =>
                !authState.auth
                  ? renderunAuth(setAuthenticated)
                  : renderRoot(setAuthenticated)
              }
            </AuthConsumer>
          </AuthProvider>
        </Router>
      )}
    </>
  );
}
