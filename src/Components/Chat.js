import { useParams } from "react-router-dom";
const Chat = () => {
    const { id } = useParams();
    return (
        <div className="chat">
            {/* <iframe src={`https://www.twitch.tv/embed/${id}/chat?darkpopout&parent=localhost`} height="100%" width="145%"></iframe> */}
            <iframe src={`https://www.twitch.tv/embed/${id}/chat?darkpopout&parent=waterboiledpizza.github.io`} height="100%" width="145%"></iframe>
        </div>
    );
};

export default Chat;
