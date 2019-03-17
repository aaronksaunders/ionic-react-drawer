import React from "react";
import { withRouter } from "react-router-dom";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonLabel,
} from "@ionic/react";


const Menu = ({ history }) => {
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonMenuToggle key={"pg1"} auto-hide="false">
            <IonItem button onClick={() => history.push("/page-one")}>
              <IonLabel>PAGE ONE</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key={"pg2"} auto-hide="false">
            <IonItem button onClick={() => history.push("/page-two")}>
              <IonLabel>PAGE TWO</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
