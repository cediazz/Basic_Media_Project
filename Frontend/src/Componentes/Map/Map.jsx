import React from "react";
import { MapContainer, TileLayer, useMap, Marker,Popup,ImageOverlay } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import LocationMarker from "./locationMarker";

export default function Map(props) {

    const imageBounds = [[500, 500], [0,0]]; 
    
    return (
        <MapContainer style={{ height: '300px', width: '1000px' }} center={[51.505, -0.09]} zoom={0} scrollWheelZoom={true}>
            <ImageOverlay   url={props.image} bounds={imageBounds} />
           
           <LocationMarker setCoordinadas={props.setCoordinadas} coordinadas={props.coordinadas} ></LocationMarker>
        </MapContainer>
    )
}