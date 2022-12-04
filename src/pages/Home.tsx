import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {useState} from "react";
import Profile from "../components/Profile";


const Home: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(true);

    const onChangeLoggedInHandler = (loggedIn: boolean): void => {
        setLoggedIn(loggedIn);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mini App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar/>
                </IonHeader>
                {loggedIn ? <Profile onLogIn={onChangeLoggedInHandler}/> : <ExploreContainer onLogIn={onChangeLoggedInHandler}/>}
            </IonContent>
        </IonPage>
    );
};

export default Home;
