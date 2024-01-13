import React from "react";
import { useState } from 'react';
import {Marker,Popup,useMapEvents } from 'react-leaflet'
import { customIcon } from "./Icon"

export default function LocationMarker(props) {
    const [position, setPosition] = useState(props.coordinadas || null)
    
    useMapEvents({
        click(e) {
          if(!props.coordinadas){
          const { lat, lng } = e.latlng;
          console.log(e.latlng);
          console.log(lat);
          console.log(lng);
          setPosition(e.latlng)
          props.setCoordinadas(e.latlng)
          }
        },
      });
    
     return position === null ? null : (
      <Marker position={props.coordinadas ? props.coordinadas : position} icon={customIcon}>
        
      </Marker>
    )
  }