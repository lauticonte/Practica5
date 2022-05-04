import React from "react";
import { IonItem, IonAvatar, IonLabel } from "@ionic/react";
import { Character } from "../models/character.model";

const CharacterContainer: React.FC<{
    character: Character;
    setNextstate: Function;
    setCharacter: Function;
}> = ({ character, setNextstate, setCharacter }) => {
    return (
        <IonItem button onClick={() => {
            setNextstate(true);
            setCharacter(character);
        }}>
            <IonAvatar slot="start">
                <img src={character.image} alt={character.name} />
            </IonAvatar>
            <IonLabel>
                <h2>{character.name}</h2>
                <p>{character.status}</p>
            </IonLabel>
        </IonItem>
    );
};

export default CharacterContainer;