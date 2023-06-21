import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleClick1 = (cat) => {
        navigate(`/game1/${cat}`);
    };

    const handleClick2 = (cat) => {
        navigate(`/game2/${cat}`);
    };

    return (
        <div className="channel-form">
            <h1>7tv Guessing Game</h1>
            <h2>Pick a category:</h2>
            <div className="buttons">
                <button onClick={() => handleClick1("TOP")}>
                    <h3>Top 100</h3>
                    <h5>channels enabled</h5>
                    <img src="https://cdn.7tv.app/emote/60ae958e229664e8667aea38/3x.webp" alt="TOP" />
                </button>
                <button onClick={() => handleClick1("TRENDING_DAY")}>
                    <h3>Trending</h3>
                    <h5>channels enabled</h5>
                    <img src="https://cdn.7tv.app/emote/6451b195344c587905fec50a/4x.webp" alt="TRENDING_DAY" />
                </button>
                <button onClick={() => handleClick2("top")}>
                    <h3>Top 100</h3>
                    <h5>Chat usage</h5>
                    <img src="https://cdn.7tv.app/emote/63071b80942ffb69e13d700f/3x.webp" alt="top" />
                </button>
                <button onClick={() => handleClick2("global")}>
                    <h3>Global</h3>
                    <h5>Chat usage</h5>
                    <img src="https://cdn.7tv.app/emote/62fa9b8a589348b4bf5a0cb9/3x.webp" alt="global" />
                </button>
            </div>
            <h5>‎</h5>
            <p>The count is finalized when the Play button is pressed, so don't worry about tomfooleries in chat when playing.</p>
            <p>Statistics provided by: 7TV, Kattah</p>
            <button
                onClick={() => {
                    localStorage.removeItem("TOP");
                    localStorage.removeItem("TRENDING_DAY");
                }}
            >
                <h3>Clear data</h3>
            </button>
        </div>
    );
};

export default Home;
