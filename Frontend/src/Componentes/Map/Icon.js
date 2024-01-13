import { Icon } from 'leaflet';
import L from 'leaflet'

export const customIcon = L.icon({
    iconUrl: require('./marker-icon-2x.png'),
    iconRetinaUrl:require('./marker-icon-2x.png'),
    iconSize: [35, 35], // Tamaño del icono en píxeles
    iconAnchor: [35,35], // Punto de anclaje del icono relativo a su posición
    className: "Leaflet-venue-icon",
  });
