import BackButton from "../BackButton/BackButton";
import "../Request/request.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { getAllRequest } from "../../redux/apiRequest";
import axios from "axios";
const socket = io.connect("http://localhost:8000")

const Request = () => {
    const [receive,setReceive] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [clientID, setClientID] = useState('');
    const user = useSelector((state)=> state.auth.login.currentUser);
    const token = user.accessToken
    const dispatch = useDispatch();
    useEffect(()=>{
        socket.on("receive_request",(data)=>{
            if(data.length === 0){
                setReceive([])
            }
            else{
                setLoading(false)
                // setReceive(receive.concat(data.request))
                setClientID(data.request[0].socketId)
            }
        })
    },[socket])

    useEffect(()=>{
        axios.get('http://localhost:8000/v1/request/',{
            headers: {token: `Bearer ${token}`}
    }).then(res=>{
            setReceive(res.data)
            setLoading(false)
        })
    },[])
    const handleAccept =(id) =>{
        socket.emit("send_notification",[{
            username: user.username, 
            socketId: clientID,
        }])
        console.log(id)
        setReceive(receive.filter((req)=>req.id !== id))


    }
    const handleDecline =(request) =>{
        console.log(request)
    }
    return ( 
            <div className="request-container">
                <BackButton/>
                    { isLoading ? <Loading
                    loadingType="PacmanLoader"
                    color="#777777"
                    loading={isLoading}
                    size="20px"
                    />
                    :  
                receive.map((request,idx)=>{
                        return(
                        <div className="card-container" key={idx}>
                            <div className="card" >
                                <h2 className="title">Request</h2>
                                <div className="card-info">
                                    <p>Username:<span> {request.username}</span> </p>
                                    <p>From:<span> {request.pickup || request.pickupAddress}</span></p>
                                    <p>To: <span> {request.dropoff || request.dropoffAddress} </span></p>
                                    <p>Travel Time: <span>{request.duration} mins</span></p>
                                    <p>Distance: <span>{request.distance} feets</span></p>
                                </div>
                                <div className="cardbutt-container">
                                    <button onClick={()=> handleAccept(request)}>Accept</button>
                                    <button onClick={()=> handleDecline(request)}>Decline</button>
                                </div>
                            </div>
                        </div>                           
                        )})
                }
            </div>
);
}
export default Request;