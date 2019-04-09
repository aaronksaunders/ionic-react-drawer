import React, { Component, useState, useEffect  } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";
import {
  IonApp,
  IonSplitPane,
  IonPage,
  IonRouterOutlet
} from "@ionic/react";
import PageOne from "./pages/PageOne";
import LoginPage from "./pages/LoginPage";
import PageOneDetail from "./pages/PageOneDetail";
import PageTwo from "./pages/PageTwo";
import Menu from "./components/Menu";


const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/page-login',
          state: { from: props.location }
        }} />
  )} />
)


export default function App() {

  const [authenticated, setAuthenticated] = useState(false)

    return (
      <Router>
        <div className="App">
          <IonApp>
            <IonSplitPane contentId="main">
              <Menu disabled={!authenticated}/>
              <IonPage id="main">
                <PrivateRoute
                  authenticated={authenticated}
                  exact
                  path="/"
                  render={() => <Redirect to="/page-one" />}
                />
                <Route path="/page-login" component={LoginPage} />
                <IonRouterOutlet>
                  <PrivateRoute path="/page-one" component={PageOne} authenticated={authenticated}/>
                  <PrivateRoute path="/page-one-detail" component={PageOneDetail} authenticated={authenticated}/>
                  <PrivateRoute path="/page-two" component={PageTwo}  authenticated={authenticated} />
                </IonRouterOutlet>
              </IonPage>
            </IonSplitPane>
          </IonApp>
        </div>
      </Router>
    );
}

