import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import correctSVG from "../SVGs/correct.svg";
import wrongSVG from "../SVGs/wrong.svg";
import "../App.css";
import { useParams, Link } from "react-router-dom";

// let emoteArray = database.emotes;
// console.log(emoteArray);

function Card(props) {
    const [emoteArray, setEmoteArray] = useState([
        {
            emote: "",
            emote_id: "",
            count: 0,
            added: "",
        },
    ]);
    const [emotes, setEmotes] = useState([]);
    const isMounted = useRef(false);
    //
    const [lost, setLost] = useState("undefined");
    const [animate, setAnimate] = useState(false);
    const [showCounter, setShowCounter] = useState(false);
    const [score, setScore] = useState(0);
    const { id } = useParams();
    // Option to Play with Ratings or Votes
    // const withRatings = false;

    useEffect(() => {
        if (isMounted.current === false) {
            const fetchEmotes = async () => {
                const response = await fetch(`https://api.kattah.me/c/${id}`);
                const json = await response.json();
                // console.log(emoteArray);
                setEmoteArray(json.emotes);
            };

            fetchEmotes();
        }
    }, []);

    useEffect(() => {
        console.log(emoteArray);
        // Picking Random Emotes from an Array
        const rnum1 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
        const rnum2 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
        // console.log(rnum1, rnum2, rnum3);

        // Inserting them in a new Array
        setEmotes([rnum1, rnum2]);

        return () => {
            isMounted.current = true;
        };
    }, [emoteArray]);

    if (isMounted.current === true && emoteArray.length > 1) {
        // console.log(emoteArray);
        function guessedCorrect() {
            setScore((score) => score + 1);
            setLost("false");
            setShowCounter(true);
            setTimeout(() => {
                setShowCounter(false);
                setAnimate(true);
                setLost("undefined");
                setTimeout(() => {
                    setShowCounter(false);
                    setEmotes((emote) => {
                        const rnum3 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
                        const oldEmotes = [...emote].splice(1, 1);
                        const newemote = [...oldEmotes, rnum3];
                        return newemote;
                    });
                    setAnimate(false);
                }, 500);
            }, 800);
        }
        function guessedWrong() {
            setLost("animate");
            setTimeout(() => {
                setLost("true");
            }, 1000);
        }
        function AnimatedCounter() {
            return <CountUp className="counter" style={showCounter ? { opacity: 1 } : { opacity: 0 }} end={showCounter ? emotes[1].count : 0} duration={0.3} />;
        }

        const displayEmotes = emotes.map((emote, index) => {
            if (index === 0) {
                return (
                    // <motion.div exit={{ x: "-50%" }} className="section1">
                    <motion.div className={animate ? "section1-animate" : "section1"}>
                        <div className="about-emote">
                            <img src={"https://cdn.7tv.app/emote/" + emote.emote_id + "/4x.webp"} alt="" className="emote-bg" />
                            <h2 className="emote-title">{emote.emote}</h2>
                            <div>is used</div>
                            <h3>{emote.count} </h3>
                            <div>times in chat</div>
                        </div>
                    </motion.div>
                );
            } else {
                return (
                    <motion.div className={animate ? "section2-animate" : "section2"}>
                        {animate ? <div className="section3"></div> : null}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="about-emote">
                            <img src={"https://cdn.7tv.app/emote/" + emote.emote_id + "/4x.webp"} alt="" className="emote-bg" />
                            <h2 className="emote-title">
                                <b>{emote.emote}</b> is used
                            </h2>
                            <div className="btn-wrapper">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setShowCounter(true);
                                        emotes[0].count < emote.count ? guessedCorrect() : emotes[0].count === emote.count ? guessedCorrect() : guessedWrong();
                                    }}
                                >
                                    More <div className="arrow-up"></div>
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setShowCounter(true);
                                        emotes[0].count > emote.count ? guessedCorrect() : emotes[0].count === emote.count ? guessedCorrect() : guessedWrong();
                                    }}
                                >
                                    Less <div className="arrow-down"></div>
                                </button>
                            </div>
                            <AnimatedCounter />
                        </motion.div>
                    </motion.div>
                );
            }
        });
        function YouLost() {
            return (
                <div className="lost-overlay">
                    <div className="lost-box">
                        <h2>You Lost</h2>
                        <h3>You Score: {score}</h3>
                        <Link to={`/`}>Home</Link>
                        <Link reloadDocument to={`/channel/${id}`} onClick={() => window.location.reload()}>
                            <div>Try again</div>
                            <div style={{ fontSize: 12 }}>Reload page if link doesn't work</div>
                        </Link>
                    </div>
                </div>
            );
        }

        function DisplayCards() {
            return displayEmotes;
        }
        function AnimateAnswer() {
            if (lost === "undefined") {
                return (
                    <div className="circle">
                        <h1 className="VS">{score}</h1>
                    </div>
                );
            } else if (lost === "animate") {
                return (
                    <div className="circle">
                        <div className="wrong"></div>
                        <img className="answer-svg" alt="" src={wrongSVG} />
                    </div>
                );
            } else if (lost === "false") {
                return (
                    <div className="circle">
                        <div className="correct"></div>
                        <img className="answer-svg" alt="" src={correctSVG} />
                    </div>
                );
            }
        }

        return (
            <AnimatePresence className="App">
                <DisplayCards />
                <AnimateAnswer />
                {lost === "true" ? <YouLost /> : null}
            </AnimatePresence>
        );
    }
}

export default Card;
