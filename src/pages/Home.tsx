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
// import { Storage } from "@capacitor/storage";


const Home: React.FC = () => {
  const pageRef = useRef<HTMLIonContentElement>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextstate, setNextstate] = useState(false);
  const [character, setCharacter] = useState<Character>({});
  const [page, setPage] = useState(2);
  const [plusicon, setPlusicon] = useState(true);

  useEffect(() => {
    const getApi = async () => {
      const url = `https://rickandmortyapi.com/api/character`;
      const result = await axios.get(url);
      setCharacters(result.data.results);      
    };
    getApi();
    // saveCharacters(characters);
  }, []);

  const fillApi = async () => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    const result = await axios.get(url);
    if (result.data.info.next === null) {
      setPlusicon(false);
    }
    setCharacters((characters) => [
      ...characters.concat(result.data.results),
    ]);
    setPage(page + 1);
    // saveCharacters(characters);
  };

  // const saveCharacters = async (characters: Character[]) => {
  //   const json = JSON.stringify(characters);
  //   await Storage.set({
  //     key: 'characters',
  //     value: json,
  //   });
  // };


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
        <Card character={character} setNextstate={setNextstate}/>
        ) : null }
    </IonPage>
  );
};

export default Home;
