import React from "react";
import {
  IonItem,
  IonLabel,
} from "@ionic/react";
import BasicPage from "../components/BasicPage";

/**
 * sets the `title` and property hasMenu = true so that the menu for the side
 * drawer is displayed
 *
 * sets the `renderContent` propety to render the contents of the page
 */
const PageTwo = () => {
  return (
    <BasicPage
      title="Page Two"
      hasMenu
      renderContent={history => {
        return (
          <>
            <IonItem lines="none">
              <IonLabel>In Page Two</IonLabel>
            </IonItem>
          </>
        );
      }}
    />
  );
};

export default PageTwo
