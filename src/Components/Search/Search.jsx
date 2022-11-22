import * as React from 'react';
import "../Search/search.css"
import { VscCircleFilled } from 'react-icons/vsc';
import { RiMore2Line } from 'react-icons/ri';
import { CiCirclePlus } from 'react-icons/ci';
import { GoPrimitiveSquare } from 'react-icons/go';
import { MdStars } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { updateStartLatitude, updateStartLongtitude } from "../../redux/startLocationSlice";
import { updateEndLatitude, updateEndLongtitude } from "../../redux/endLocationSlice";
import { AddressAutofill, } from '@mapbox/search-js-react';
import BackButton from "../BackButton/BackButton";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid"
import { createRequest } from "../../redux/requestSlice";
import Popup from '../PopupBox/Popup';


const Search = () => {
    const style = { color: "black", fontSize: "1.5em"};
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [open, setOpen] = React.useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.login.currentUser);
    const socket = io.connect("http://localhost:8000")

    const handleRequest = (e) =>{
        e.preventDefault();
        setOpen(true);
        const newRequest = [{
            id:uuidv4(),
            socketId:socket.id,
            username: user.username,
            pickup : pickup,
            dropoff : dropoff, 
        }];
        dispatch(createRequest(newRequest))
        socket.emit("send_request",{ request: newRequest})
        setLoading(true)
            
    }


    const getPickupCoordinates = async ()=>{
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w`)
            .then(function (response) {
                dispatch(updateStartLongtitude(response.data.features[0].center[0]))
                dispatch(updateStartLatitude(response.data.features[0].center[1]));
            })
            .catch(function (error) {
                console.log(error); 
            })
            .finally(function () {
            });
    }
    const getDropoffCoordinates = async ()=>{
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w`)
        .then(function (response) {
            dispatch(updateEndLongtitude(response.data.features[0].center[0]))
            dispatch(updateEndLatitude(response.data.features[0].center[1]))
            
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
    }
    useEffect(()=>{
        if(pickup && dropoff){
            getPickupCoordinates();
            getDropoffCoordinates();
        }
    },[pickup,dropoff])

    return (
    <div className="search-container">
        <BackButton/>
    {/* Inputs box */}
        <div className="input-container">
            <div className="from-to-icons">
                <VscCircleFilled style={style} size={25}/>
                <RiMore2Line style={style} size={25}/>
                <GoPrimitiveSquare style={style} size={25}/>
            </div>
            <div className="input-boxes">
            <form className="flex flex--column" >
            <AddressAutofill accessToken="pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w">
                <input 
                    type="text"
                    id="pickup"
                    name="pickup" 
                    placeholder="Enter pickup location" 
                    autoComplete="address-line1"
                    onChange={(e)=> setPickup(e.target.value)}
                    />
            </AddressAutofill>
            </form>
            <form className="flex flex--column" >
            <AddressAutofill accessToken="pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w">
                <input 
                    type="text"
                    id="dropoff"
                    name="dropoff" 
                    placeholder="Where to?" 
                    autoComplete="address-line1"
                    onChange={(e)=> setDropoff(e.target.value)}
                    />
            </AddressAutofill>
            </form>

            </div>
            <div className="plus-icon-container" >
                <CiCirclePlus size={40} className="plus-icon" style={style}/>
            </div>
            
        </div>
    {/* //Favorites Places */}
        <div className="save-places">
            <MdStars style={style}/>
            <h3>Save places</h3>
        </div>
    {/* //Request Button */}
        <div className="request-button-container">'
            <button onClick={handleRequest}>Request</button>
            <Popup open={open} setOpen={setOpen} isLoading={isLoading} setLoading={setLoading}/>
            </div>
    </div>
    );
}
export default Search;