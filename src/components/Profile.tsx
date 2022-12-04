import {useEffect, useState} from 'react';
import {IonAvatar, IonButton, IonText} from '@ionic/react';
import {Camera, CameraResultType} from '@capacitor/camera';
import "./Profile.css"
import { Geolocation, Position } from '@capacitor/geolocation';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css'

interface ContainerProps {
    onLogIn: (arg: boolean) => void;
}
type WebPath = string | undefined;

const Profile: React.FC<ContainerProps> = (props: ContainerProps) => {
    const [image, setImage] = useState<WebPath>("");
    let map: tt.Map;
    const takePicture = async () => {
        const cameraResult = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
        setImage(cameraResult.webPath);
    }

    const onLogOut = () => {
        props.onLogIn(false);
    }

    useEffect(() => {
        map = tt.map({
            key: 'NUTS6nRZPbWXXvMnvGAYkzS4U27ejsK0',
            container: 'map',
        });
        map.on('load', () => {
            map.resize();
        })
    }, []);

    useEffect(() => {
        someFunction();
    });

    async function someFunction(){
        const coordinates:Position = await Geolocation.getCurrentPosition();
        let marker2 = new tt.Marker({color:'green'}).setLngLat([coordinates.coords.longitude, coordinates.coords.latitude]).addTo(map);
        console.log('Current position:', coordinates);
    }
    return (
        <>
            <div className="profile-container">
                <IonText><h1>Hello Admin</h1></IonText>
                <IonAvatar onClick={takePicture} className="avatar">
                    <img alt="Silhouette of a person's head"
                         src={image === "" ? "https://ionicframework.com/docs/img/demos/avatar.svg" : image}/>
                </IonAvatar>
                <IonButton type="submit" expand="full" onClick={onLogOut}>Logout</IonButton>
            </div>
            <div id='map'></div>
        </>
    );
}

export default Profile;