import React from "react";
import {
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import BasicPage from "../components/BasicPage";

/**
 * sets the `title` and property hasMenu = true so that the menu for the side
 * drawer is displayed
 *
 * sets the `renderContent` propety to render the contents of the page
 */
const PageOne = () => {
  return (
    <BasicPage
      title="Page One"
      hasMenu
      renderContent={history => {
        return (
          <>
            <IonItem lines="none">
              <IonLabel>In Page One</IonLabel>
            </IonItem>
            <IonButton
              expand="full"
              onClick={e => {
                if (!e.currentTarget) {
                  return;
                }
                e.preventDefault();
                history.push("/page-one-detail");
              }}
            >
              Next Page
            </IonButton>
          </>
        );
      }}
    />
  );
};

export default PageOne
