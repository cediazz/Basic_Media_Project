import React from "react";
import { MapContainer, TileLayer, useMap, Marker,Popup,ImageOverlay } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ViewMediaLocationMarker from "./ViewMediaLocationMarker";

export default function ViewMediaMap(props) {

    const imageBounds = [[500, 500], [0,0]]; 
    
    return (
        <MapContainer style={{ height: '500px', width: '1000px' }} center={[51.505, -0.09]} zoom={0} scrollWheelZoom={true}>
            <ImageOverlay   url={props.image} bounds={imageBounds} />
           
           {props.medias.map( (media,index) => <ViewMediaLocationMarker mediaData={media} getMediasLink={props.getMediasLink} setMedias={props.setMedias} mediaSons={[props.mediaSons[index]]} setMediaSons={props.setMediaSons}/> )}
        </MapContainer>
    )
}