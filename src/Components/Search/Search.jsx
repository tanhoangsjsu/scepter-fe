import "../Search/search.css"
import { IoMdArrowRoundBack } from 'react-icons/io';
import { VscCircleFilled } from 'react-icons/vsc';
import { RiMore2Line } from 'react-icons/ri';
import { CiCirclePlus } from 'react-icons/ci';
import { GoPrimitiveSquare } from 'react-icons/go';
import { MdStars } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Search = () => {
    const style = { color: "black", fontSize: "1.5em"}
    const navigate = useNavigate();
    const handleBack =() =>{
        navigate("/HomePage");
    }
    return (
        <>
            <div className="search-container">
                <div className="back-button-container">
                    <IoMdArrowRoundBack className="back-button" size={35} style={style} onClick={handleBack}/>
                </div>
                <div className="input-container">
                    <div className="from-to-icons">
                        <VscCircleFilled style={style} size={25}/>
                        <RiMore2Line style={style} size={25}/>
                        <GoPrimitiveSquare style={style} size={25}/>
                    </div>
                    <div className="input-boxes">
                        <input type="text" placeholder="Enter pickup location"></input>
                        <input type="text" placeholder="Where to?"></input>
                    </div>
                    <div className="plus-icon-container" >
                        <CiCirclePlus size={40} className="plus-icon" style={style}/>
                    </div>
                </div>
                <div className="save-places">
                    <MdStars style={style}/>
                    <h3>Save places</h3>
                </div>
                <div className="request-button-container">'
                    <button>Request</button>
                </div>
            </div>
        </>
    );
}
export default Search;