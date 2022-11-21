import BackButton from "../BackButton/BackButton";
import "../Request/request.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "../../redux/requestSlice";

const Request = () => {
    const request = useSelector((state)=>state.request.requests)
    const handleDecline =(request) =>{
        dispatch(deleteRequest(request))
    }
    const dispatch = useDispatch()
    return ( 
        <>
            <div className="request-container">
                <BackButton/>
                <div className="card-container">
                {request.slice(1).map((request,index)=>{
                    return(
                    <div className="card" key={index}>
                        <h2 className="title">Request</h2>
                        <div className="card-info">
                            <p>Username: <span> {request.username}</span> </p>
                            <p>From:<span> {request.pickup} </span></p>
                            <p>To: <span> {request.dropoff} </span></p>
                        </div>
                        <div className="cardbutt-container">
                            <button>Accept</button>
                            <button onClick={()=> handleDecline(request)}>Decline</button>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
        </>
);
}
export default Request;