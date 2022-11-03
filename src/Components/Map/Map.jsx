import "../HomePage/homepage.css"
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect } from "react";
import { useSelector} from "react-redux";


const Map = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w';

    const pickupLongtitude = useSelector((state)=>(state.pickup.longtitude))
    const pickupLattitude = useSelector((state)=>(state.pickup.lattitude))
    const dropoffLongtitude = useSelector((state)=>(state.dropoff.longtitude))
    const dropoffLattitude = useSelector((state)=>(state.dropoff.lattitude))
    let pickupCoordinates = [pickupLongtitude, pickupLattitude]
    let dropoffCoordinates = [dropoffLongtitude, dropoffLattitude]
    useEffect(()=>{
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/tanhoang14/cl9aa17ku002q14obtxtf7srx', // style URL
        center: [-121.88492, 37.3361663], // starting position [lng, lat]
        zoom: 9, // starting zoom
        projection: 'globe' // display the map as a 3D globe
    });
        map.addControl( // Add geolocate control to the map.
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true,// When active the map will receive updates to the device's location as it changes.
        showUserHeading: true // Draw an arrow next to the location dot to indicate which direction the device is heading.
        })
    );
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');

        if(pickupCoordinates){
            addToMap(map, pickupCoordinates)
        }
        if(dropoffCoordinates){
            addToMap(map, dropoffCoordinates)
        }
        if(dropoffCoordinates && pickupCoordinates){
            map.fitBounds([
                [pickupLongtitude, pickupLattitude], // southwestern corner of the bounds
                [dropoffLongtitude, dropoffLattitude] // northeastern corner of the bounds
                ],{
                    padding: 60
                });
        }
        // map.on('load',()=>{
        //     map.addSource('route', {
        //         'type': 'geojson',
        //         'data': {
        //             'type': 'Feature',
        //             'properties': {},
        //             'geometry': {
        //                 'type': 'LineString',
        //                 'coordinates': [
        //                     [pickupLongtitude, pickupLattitude],
        //                     [dropoffLongtitude, dropoffLattitude],
        //                 ]
        //             }
        //         }
        //     });
        //     map.addLayer({
        //         'id': 'route',
        //         'type': 'line',
        //         'source': 'route',
        //         'layout': {
        //             'line-join': 'round',
        //             'line-cap': 'round'
        //         },
        //         'paint': {
        //             'line-color': '#000000',
        //             'line-width': 7
        //         }
        //     });
        // })

        // create a function to make a directions request
    async function getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
        const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLongtitude},${pickupLattitude};${dropoffLongtitude},${dropoffLattitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
            type: 'geojson',
            data: geojson
            },
            layout: {
            'line-join': 'round',
            'line-cap': 'round'
            },
            paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
            }
        });
        }
        // add turn instructions here at the end
        const steps = data.legs[0].steps;
        const instructions = document.getElementById('instructions');
        let tripInstructions = '';
        for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        }
        instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
        )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
    }
    map.on('load', () => {
        // make an initial directions request that
        // starts and ends at the same location
        getRoute(pickupCoordinates);
    
        // Add starting point to the map
        map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
            type: 'FeatureCollection',
            features: [
                {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: pickupCoordinates
                }
                }
            ]
            }
        },
        paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
        }
        });
    });
    
},[pickupLongtitude,pickupLattitude,dropoffLongtitude,dropoffLattitude])
    
    const addToMap = (map, coordinates) =>{
        // Create a default Marker and add it to the map.
        const marker1 = new mapboxgl.Marker({ color: 'black'})
        .setLngLat(coordinates)
        .addTo(map);
        // Create a default Marker, colored black, rotated 45 degrees.
        const marker2 = new mapboxgl.Marker({ color: 'black'})
        .setLngLat(coordinates)
        .addTo(map);
    }


    
    return ( 
        <>
        <div className ="map-container" id="map">MAP</div>
        <div id="instructions"></div>
        </>
    );
    
}
export default Map;