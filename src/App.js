import React, { Component } from "react";
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
import PageOneDetail from "./pages/PageOneDetail";
import PageTwo from "./pages/PageTwo";
import Menu from "./components/Menu";



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <IonApp>
            <IonSplitPane contentId="main">
              <Menu />
              <IonPage id="main">
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/page-one" />}
                />
                <IonRouterOutlet>
                  <Route path="/page-one" component={PageOne} />
                  <Route path="/page-one-detail" component={PageOneDetail} />
                  <Route path="/page-two" component={PageTwo} />
                </IonRouterOutlet>
              </IonPage>
            </IonSplitPane>
          </IonApp>
        </div>
      </Router>
    );
  }
}

export default App;
