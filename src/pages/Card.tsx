import React, { Fragment } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonGrid,
} from "@ionic/react";
import { Character } from "../models/character.model";
import { arrowBack } from "ionicons/icons";

const Card: React.FC<{
    character: Character;
    setNextstate: Function;
  }> = ({ character, setNextstate }) => {
    return (
      <>
        <IonHeader style={{ position: "absolute" }}>
          <IonToolbar>
            <IonButton
              slot="start"
              color="dark"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setNextstate(false);
              }}
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
            <IonTitle>Character</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen style={{ position: "absolute", top: 56 }}>
          <IonCard>
            <IonGrid style={{display: "flex", justifyContent: "center", padding: 15}}>
              <img src={character.image} />
            </IonGrid>
            <IonCardHeader>
              {character.type === "" ? (
                <IonCardSubtitle>{character.species}</IonCardSubtitle>
              ) : (
                <IonCardSubtitle>
                  {character.species}, {character.type}
                </IonCardSubtitle>
              )}
              <IonCardTitle>{character.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Status: {character.status}.<br />
              Gender: {character.gender}.<br />
              Origin: {character.origin?.name}.<br />
              Location: {character.location?.name}.
            </IonCardContent>
          </IonCard>
          <IonGrid style={{height: 56}}></IonGrid>
        </IonContent>
      </>
    );
  };
  
  export default Card;