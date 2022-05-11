import React, { useState, useEffect, useRef } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';

import './Home.css';
import axios from 'axios';
import CharacterContainer from '../components/CharacterContainer';
import { addCircle } from 'ionicons/icons';
import { Character } from '../models/character.model';
import Card from './Card';
import { Storage } from "@capacitor/storage";
import { Toast } from '@capacitor/toast';


const Home: React.FC = () => {
  const pageRef = useRef<HTMLIonContentElement>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextstate, setNextstate] = useState(false);
  const [character, setCharacter] = useState<Character>({});
  const [page, setPage] = useState(2);
  const [plusicon, setPlusicon] = useState(true);

  useEffect(() => {
    const checkStorage = async () => {
      await Storage.get({ key: 'characters' }).then(async (data) => {      
        if (data.value && localStorage.getItem('CapacitorStorage.characters') !== null) {
          const characters = JSON.parse(data.value);
          setCharacters(characters);
          console.log("Characters loaded from LocalStorage");
        } else {
          try {
          const url = 'https://rickandmortyapi.com/api/character';
          const result = await axios.get(url);
          setCharacters(result.data.results);
          Storage.set({
            key: 'characters',
            value: JSON.stringify(result.data.results)
          });
          console.log("Characters loaded from API");
            } catch (error) {
                Toast.show({
                    text: "Error loading characters from API",
                    duration: "short"
              })
            }
          }
        })
      }
    checkStorage();
  }, []);
    
    

  const deleteCharacter = async(id: number) => {
    await Storage.get({ key: 'characters' }).then(async(data) => {
      if (data.value) {
        const characters = JSON.parse(data.value);
        const newCharacters = characters.filter((character: { id: number; }) => character.id !== id);
        setCharacters(newCharacters);
        Storage.set({
          key: 'characters',
          value: JSON.stringify(newCharacters)
        });
        Toast.show({
          text: `${character.name} has been deleted`,
          duration: 'long',
        });
        console.log(`Character "${character.name}" deleted`);
        }
      }
    );
  }

  const fillApi = async () => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const result = await axios.get(url);
    if (result.data.info.next === null) {
      setPlusicon(false);
    }
    setCharacters((characters) => [
      ...characters.concat(result.data.results),
    ]);
    Storage.set({
      key: 'characters',
      value: JSON.stringify(characters)
    });
    setPage(page + 1);
  };

  const hola = () => {
    console.log(hola);
  }

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {characters.map((character, index) => (
            <CharacterContainer
              key={index}
              character={character}
              setNextstate={setNextstate}
              setCharacter={setCharacter}
            />
          ))}
        </IonList>
        {plusicon ? (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={fillApi}>
                  <IonIcon icon={addCircle} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : null}        
      </IonContent>
      {nextstate ? (
        <Card character={character} setNextstate={setNextstate} deleteCharacter={deleteCharacter} />
        ) : null }
    </IonPage>
  );
};

export default Home;
