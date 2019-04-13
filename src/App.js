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

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
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
};

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [authState, setAuthState] = useState({
    auth: false,
    loaded: true
  });

  // useEffect(() => {
  //   // if (authState.loaded) return
  //   let x = firebaseService.isInitialized().then(v => {
  //     debugger;

  //     if (!authState.loaded)
  //       if (v) {
  //         setAuthState({ auth: true, loaded: true });
  //       } else {
  //         setAuthState({ auth: false, loaded: true });
  //       }
  //     console.log(authState);
  //   });
  // }, [authState.auth]);

  const renderRoot = (setAuthenticated, isAuth) => {
    console.log( isAuth )
    //setAuthenticated(isAuth);
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
      {!authState.loaded ? null : (
        <Router>
          <AuthProvider>
            <AuthConsumer>
              {({ setAuthenticated, isAuth }) =>
                renderRoot(setAuthenticated, isAuth)
              }
            </AuthConsumer>
          </AuthProvider>
        </Router>
      )}
    </>
  );
}
