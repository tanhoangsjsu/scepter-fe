import "../HomePage/homepage.css"
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect } from "react";
import Map from "../Map/Map";
import UserImage from "../../assest/Avatar.png"
import Car from "../../assest/Car.svg"
import Wheels from "../../assest/Wheels.png"
import Text from "../../assest/Text.svg"

const HomePage = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w';

  useEffect(()=>{
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/tanhoang14/cl9cd5wre001014p50euradcq', // style URL
      center: [-121.88492, 37.3361663], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: 'globe' // display the map as a 3D globe
  });
  },[])
  return ( 
    <>
    <div className ="home-container">
      <Map/>
      <div className="action-items-container">
        <div className="header-container">
          <label className="logo"> SCEPTER </label>
          <div className="profile-container">
              <div className="user-name">Test User</div>
              <img clasName ="user-img" src={UserImage}></img>
          </div>
        </div>      
        <div className="action-buttons-container">
            <div className="action-button">
              <img src={Car}></img>
              <h3>Ride</h3>
            </div>
            <div className="action-button">
              <img src={Wheels}></img>
                <h3>Wheels</h3>
            </div>
            <div className="action-button">
              <img src={Text}></img>
              <h3>Text</h3>
            </div>
        </div>
        <div className="input-button">WHERE TO?</div>
      </div>
    </div>
    </>
  );
}
export default HomePage;