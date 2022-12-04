import './ExploreContainer.css';
import {IonInput, IonItem, IonLabel, IonButton, IonText, IonAvatar, IonToast} from '@ionic/react';
import {useState} from "react";

interface ContainerProps {
    onLogIn: (arg: boolean) => void;
}

interface InputChangeEventDetail {
    value: string | undefined | null;
}

interface InputCustomEvent extends CustomEvent {
    detail: InputChangeEventDetail;
    target: HTMLIonInputElement;
}

type Input = string|number|undefined|null;

const ExploreContainer: React.FC<ContainerProps> = (props: ContainerProps) => {

    const [username, setUsername] = useState<Input>("");
    const [password, setPassword] = useState<Input>("");

    const [showToast, setShowToast] = useState(false);

    const onChangeUsernameHandler = (event: InputCustomEvent) => {
        setUsername(event.target.value);
    }

    const onChangePasswordHandler = (event: InputCustomEvent) => {
        setPassword(event.target.value);
    }

    const login = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (username === "admin" && password === "admin") {
            props.onLogIn(true);
        } else {
            setShowToast(true);
        }
    }

    return (
        <div className="login-form">
            <IonAvatar>
                <img alt="Silhouette of a person's head"
                     src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
            </IonAvatar>
            <IonText><h1>Authentication</h1></IonText>
            <div className="login-inputs">
                <IonItem>
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput name="username" placeholder="Enter text" onIonChange={onChangeUsernameHandler}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput name="password" type="password" value={password} onIonChange={onChangePasswordHandler}></IonInput>
                </IonItem>
            </div>
            <IonButton type="submit" expand="full" onClick={login}>Login</IonButton>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Your credentials are not correct!"
                duration={2000}
            />
        </div>
    );
};

export default ExploreContainer;
