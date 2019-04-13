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
              {({ isAuth, login }) => {
                return (
                  <IonButton
                    expand="full"
                    onClick={async e => {
                      debugger;
                      if (!e.currentTarget) {
                        return;
                      }
                      e.preventDefault();
                      let r = await login(
                        "aaron@clearlyinnovative.com",
                        "password123"
                      );
                      history.push("/page-one");
                    }}
                  >
                    {isAuth ? "Logged In" : "Login"}
                  </IonButton>
                );
              }}
            </AuthConsumer>
            <IonButton
              expand="full"
              onClick={e => {
                e.preventDefault();
                history.push("/page-create-account");
              }}
            >
              Create Account
            </IonButton>
          </>
        );
      }}
    />
  );
};

export default LoginPage;
