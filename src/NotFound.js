import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <div className="not-found">
            <h2>DOCING</h2>
            <p>WHAT IS THIS PAGE ABOUT</p>
            <Link to="/">Back to the BOG</Link>
        </div>
    );
};

export default NotFound;
