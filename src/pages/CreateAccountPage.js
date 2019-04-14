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
const CreateAccountPage = () => {
  return (
    <BasicPage
      title="CreateAccountPage"
      hasMenu
      renderContent={history => {
        return (
          <>
            <IonItem lines="none">
              <IonLabel>In Create Account Page</IonLabel>
            </IonItem>
            <AuthConsumer>
              {({ isAuth, login }) => (
                <IonButton
                  expand="full"
                  onClick={e => {
                    if (!e.currentTarget) {
                      return;
                    }
                    e.preventDefault();
                    login("email@mail.com", "password");
                    //history.push("/page-one");
                  }}
                >
                  Create Account
                </IonButton>
              )}
            </AuthConsumer>
            <IonButton
              expand="full"
              onClick={e => {
                if (!e.currentTarget) {
                  return;
                }
                e.preventDefault();
                history.push("/page-login");
              }}
            >
              Cancel
            </IonButton>
          </>
        );
      }}
    />
  );
};

export default CreateAccountPage;
