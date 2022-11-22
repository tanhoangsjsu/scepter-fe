import BackButton from "../BackButton/BackButton";
import "../Request/request.css"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useState } from "react";
import Loading from "../Loading/Loading";
const socket = io.connect("http://localhost:8000")

const Request = () => {
    const [receive,setReceive] = useState([])
    const [isLoading, setLoading] = useState(false);
    const user = useSelector((state)=> state.auth.login.currentUser);
    useEffect(()=>{
        socket.on("receive_request",(data)=>{
            if(data.length === 0){
                setReceive([])
            }
            else{
                setLoading(true)
                setReceive(data.request)
            }
        })
    },[socket])
    const handleAccept =() =>{
        socket.emit("send_notification",[{
            username: user.username, 
            socketId: receive[0].socketId,
        }])

    }
    const handleDecline =(request) =>{
        console.log(request)
    }
    return ( 
            <div className="request-container">
                <BackButton/>
                <div className="card-container">
                    {isLoading ? receive.map((request)=>{
                        return(
                            <div className="card" key={request.id}>
                                <h2 className="title">Request</h2>
                                <div className="card-info">
                                    <p>Username:<span> {request.username}</span> </p>
                                    <p>From:<span> {request.pickup}</span></p>
                                    <p>To: <span> {request.dropoff} </span></p>
                                </div>
                                <div className="cardbutt-container">
                                    <button onClick={()=> handleAccept(request)}>Accept</button>
                                    <button onClick={()=> handleDecline(request)}>Decline</button>
                                </div>
                            </div>                           
                        )
                    }): 
                        <Loading
                        loadingType="PacmanLoader"
                        color="#777777"
                        loading={isLoading}
                        size="30px"
                        />}
                </div>
            </div>
);
}
export default Request;