import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const url = "https://api.kattah.me/c/";

const Home = () => {
    const [channel, setChannel] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(channel);
        try {
            const response = await fetch(url + channel);
            const jsonData = await response.json();
            if (jsonData.success === true) {
                // console.log(jsonData.emotes);
                navigate(`/channel/${channel}`);
            } else {
                alert("No channel found.");
                navigate("/");
            }
        } catch (error) {
            console.error(`Download error: ${error.message}`);
        }
    };

    return (
        <div className="channel-form">
            <form onSubmit={handleSubmit}>
                <label>Enter channel name:</label>
                <input type="text" id="channel" onChange={(e) => setChannel(e.target.value)} value={channel} required />
                <button>PLAAAAY</button>
            </form>
        </div>
    );
};

export default Home;
