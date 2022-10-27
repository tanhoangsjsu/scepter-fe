import "../HomePage/homepage.css"
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect } from "react";
const Map = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w';

    useEffect(()=>{
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/tanhoang14/cl9aa17ku002q14obtxtf7srx', // style URL
        center: [-121.88492, 37.3361663], // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: 'globe' // display the map as a 3D globe
    });
    },[])
    return ( 
        <>
        <div className ="map-container" id="map">MAP</div>
        </>
    );
}
export default Map;