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
            <h1>Emote Usage Guessing Game</h1>
            <h3>The Top 100 used emote of the channel of your choice is picked. Guess which ones are used more (and which ones to remove Evilge)</h3>
            <p>Please do note that not all channel are available, and some emotes might be displayed the wrong version.</p>
            <form onSubmit={handleSubmit}>
                <label>Enter channel name:</label>
                <input type="text" id="channel" onChange={(e) => setChannel(e.target.value)} value={channel} required />
                <button>PLAAAAY</button>
            </form>
            <div>Statistics provided by: Kattah</div>
        </div>
    );
};

export default Home;
