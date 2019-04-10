import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";
import { IonApp, IonSplitPane, IonPage, IonRouterOutlet } from "@ionic/react";
import PageOne from "./pages/PageOne";
import LoginPage from "./pages/LoginPage";
import PageOneDetail from "./pages/PageOneDetail";
import PageTwo from "./pages/PageTwo";
import Menu from "./components/Menu";

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
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(()=>{
    
  })

  return (
    <Router>
      <AuthProvider>
        <IonApp>
          <IonSplitPane contentId="main">
            <Menu disabled={!authenticated} />
            <IonPage id="main">
              <PrivateRoute
                exact
                path="/"
                render={() => <Redirect to="/page-one" />}
              />

              <IonRouterOutlet>
              <Route path="/page-login" component={LoginPage} />
                <PrivateRoute path="/page-one" component={PageOne} />
                <PrivateRoute
                  path="/page-one-detail"
                  component={PageOneDetail}
                />
                <PrivateRoute path="/page-two" component={PageTwo} />
              </IonRouterOutlet>
            </IonPage>
          </IonSplitPane>
        </IonApp>
      </AuthProvider>
    </Router>
  );
}
