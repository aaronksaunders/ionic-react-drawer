import React from "react";
import { withRouter } from "react-router-dom";
import { AuthConsumer } from "../components/AuthContext";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonLabel
} from "@ionic/react";

const Menu = ({ history, disabled }) => {
  return (
    <IonMenu contentId="main" disabled={disabled}>
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
          <IonMenuToggle key={"logout"} auto-hide="false">
            <AuthConsumer>
              {({ isAuth, logout }) => (
                <IonItem
                  button
                  onClick={async e => {
                    if (!e.currentTarget) {
                      return;
                    }
                    e.preventDefault();
                    let r = await logout();
                    //history.push("/");
                  }}
                >
                  <IonLabel>LOGOUT</IonLabel>
                </IonItem>
              )}
            </AuthConsumer>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
