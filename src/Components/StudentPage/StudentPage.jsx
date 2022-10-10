import { useContext, useRef, useEffect, useCallback, useState } from 'react';
import Context from '../../Context/Context';
import "../../Components/StudentPage/studentpage.css"
import ReactMapGL from 'react-map-gl';
const StudentPage = () => {
  const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
    const[viewport,setViewPort] = useState({
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 37.334841,
        longitude:-121.88492,
        zoom: 16
      }
    })
    const renderSidebar = () => {
      const isUser = user && user.role === 'user';
      if (isUser && !currentRide) {
        return 
      } 
      if (isUser && currentRide) {
        return
      }
      if (!isUser && !currentRide) {
        return 
      }
      if (!isUser && currentRide) {
        return
      }
    }
    return ( 
      <div className='map-container'>
      <ReactMapGL {...viewport} mapStyle="mapbox://styles/mapbox/streets-v11" 
      onViewportChange={(viewport => setViewPort(viewport))} 
      mapboxAccessToken="pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w">
      </ReactMapGL>
      </div>
    );

    
} 
export default StudentPage;