import "../Search/search.css"
import { IoMdArrowRoundBack } from 'react-icons/io';
import { VscCircleFilled } from 'react-icons/vsc';
import { RiMore2Line } from 'react-icons/ri';
import { CiCirclePlus } from 'react-icons/ci';
import { GoPrimitiveSquare } from 'react-icons/go';
import { MdStars } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { updateStartLatitude, updateStartLongtitude } from "../../redux/startLocationSlice";
import { updateEndLatitude, updateEndLongtitude } from "../../redux/endLocationSlice";
import { createRequest } from "../../redux/requestSlice";

const Search = () => {
    const style = { color: "black", fontSize: "1.5em"};
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=> state.auth.login.currentUser);

    const handleRequest = async (e) =>{
        e.preventDefault();
        const newRequest = {
            id:uuidv4(),
            username: user.username,
            pickup : pickup,
            dropoff : dropoff, 
        }
        dispatch(createRequest(newRequest))

	    // Send Axios event to back-end to create new request
        const res = await axios.post("v1/request/createRequest", newRequest)

        handleBack()
    }
    const getPickupCoordinates = async ()=>{
            // const test1 = "60 S 9th St, San Jose, CA 95112"
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w`)
            .then(function (response) {
                console.log(response.data.features[0].center)
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
        // const test2 = "229 E San Salvador, San Jose, CA 95112"
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w`)
        .then(function (response) {
            console.log(response.data.features[0].center);
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

    const handleBack =() =>{
        navigate("/homePage");
    }
    console.log(pickup,dropoff)
    return (
    <div className="search-container">
        <div className="back-button-container">
            <IoMdArrowRoundBack 
                className="back-button" 
                size={35} 
                style={style} 
                onClick={handleBack}
            />
        </div>
    {/* Inputs box */}
        <div className="input-container">
            <div className="from-to-icons">
                <VscCircleFilled style={style} size={25}/>
                <RiMore2Line style={style} size={25}/>
                <GoPrimitiveSquare style={style} size={25}/>
            </div>
            <div className="input-boxes">
                <input 
                    type="text" 
                    id="pickup"
                    name="pickup"
                    placeholder="Enter pickup location" 
                    value={pickup} 
                    onChange={(e)=> setPickup(e.target.value)}
                    />
                <input 
                    type="text"
                    id="dropoff"
                    name="dropoff" 
                    placeholder="Where to?" 
                    value={dropoff} 
                    onChange={(e)=> setDropoff(e.target.value)}
                    />
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
        </div>
    </div>
    );
}
export default Search;
