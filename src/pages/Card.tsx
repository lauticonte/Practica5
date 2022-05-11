import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonGrid,
  IonModal,
  useIonToast,
} from "@ionic/react";
import { Character } from "../models/character.model";
import { trashBin} from "ionicons/icons";
import { Toast } from "@capacitor/toast";

const Card: React.FC<{
    character: Character;
    setNextstate: Function;
    deleteCharacter: Function;
  }> = ({ character, setNextstate, deleteCharacter }) => {

    const [showModal, setShowModal] = useState(true);

    const [present, dismiss] = useIonToast();

    return (
      <div>
      <IonModal
          isOpen={showModal}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5, 1]}
          onDidDismiss={() => setNextstate(false)}>
        
      <IonCard>
            <IonGrid style={{display: "flex", justifyContent: "center", padding: 15}}>
              <img src={character.image} alt={character.name} />
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
          <IonButton 
          style={{display: "flex", justifyContent: "center"}}
          onClick={() =>
            present({
              message: `Are you sure you want to delete ${character.name}?`,
              buttons: [
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: () => {
                    dismiss();
                  }
                },
                {
                  text: "Delete",
                  handler: () => {
                    deleteCharacter(character.id);
                    dismiss();
                    setShowModal(false);
                  }
                }
              ]
            })
          }>
              Delete Character&nbsp;
            <IonIcon icon={trashBin} />
          </IonButton>
      </IonModal>
      </div>
    );
  };
  
  export default Card;