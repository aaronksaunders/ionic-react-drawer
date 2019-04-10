import React from "react";
import { IonItem, IonLabel, IonButton } from "@ionic/react";
import BasicPage from "../components/BasicPage";
import { AuthConsumer } from "../components/AuthContext";

/**
 * sets the `title` and property hasMenu = true so that the menu for the side
 * drawer is displayed
 *
 * sets the `renderContent` propety to render the contents of the page
 */
const LoginPage = () => {
  return (
    <BasicPage
      title="Login Page"
      hasMenu
      renderContent={history => {
        return (
          <>
            <IonItem lines="none">
              <IonLabel>In Login Page</IonLabel>
            </IonItem>
            <AuthConsumer>
              {({ setAuthenticated, isAuth }) => (
                <IonButton
                  expand="full"
                  onClick={e => {
                    debugger;
                    if (!e.currentTarget) {
                      return;
                    }
                    e.preventDefault();
                    setAuthenticated(true);
                    //history.push("/page-one");
                  }}
                >
                  {isAuth ? "Logged In" : "Login"}
                </IonButton>
              )}
            </AuthConsumer>
          </>
        );
      }}
    />
  );
};

export default LoginPage;
