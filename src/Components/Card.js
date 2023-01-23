import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import correctSVG from "../SVGs/correct.svg";
import wrongSVG from "../SVGs/wrong.svg";
import "../App.css";
import database from "../json/db.json";

let EmoteArray = database.emotes;
console.log(EmoteArray);

function Card(props) {
    // Picking Random Emotes from an Array
    const rnum1 = EmoteArray[Math.floor(Math.random() * EmoteArray.length)];
    const rnum2 = EmoteArray[Math.floor(Math.random() * EmoteArray.length)];
    const rnum3 = EmoteArray[Math.floor(Math.random() * EmoteArray.length)];
    console.log(rnum1, rnum2, rnum3);

    // Inserting them in a new Array
    const getEmotes = [rnum1, rnum2];
    const [emotes, setEmotes] = useState(getEmotes);

    //
    const [lost, setLost] = useState("undefined");
    const [animate, setAnimate] = useState(false);
    const [showCounter, setShowCounter] = useState(false);
    // Option to Play with Ratings or Votes
    const withRatings = false;

    function guessedCorrect() {
        setLost("false");
        setShowCounter(true);
        setTimeout(() => {
            setShowCounter(false);
            setAnimate(true);
            setLost("undefined");
            setTimeout(() => {
                setShowCounter(false);
                setEmotes((emote) => {
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
        if (withRatings) {
            return (
                <CountUp
                    className="counter"
                    style={showCounter ? { opacity: 1 } : { opacity: 0 }}
                    end={showCounter ? emotes[1].channels : 0}
                    decimals={1}
                    duration={0.3}
                />
            );
        } else {
            return (
                <CountUp className="counter" style={showCounter ? { opacity: 1 } : { opacity: 0 }} end={showCounter ? emotes[1].channels : 0} duration={0.3} />
            );
        }
    }

    const displayEmotes = emotes.map((emote, index) => {
        if (index === 0) {
            return (
                <motion.div exit={{ x: "-50%" }} className="section1">
                    {/* <img src={ImageNotFound} alt="" className="emote-bg2" /> */}

                    <div className="about-emote">
                        <img src={"https://cdn.7tv.app/emote/" + emote.id + "/4x.webp"} alt="" className="emote-bg" />
                        <h2 className="emote-title">{emote.name}</h2>
                        {withRatings ? <h3> is rated {emote.ratings}</h3> : <h3>is enabled in {emote.channels} channels</h3>}
                    </div>
                </motion.div>
            );
        } else {
            return (
                <motion.div className={animate ? "section2-animate" : "section2"}>
                    {animate ? <div className="section3"></div> : null}
                    {/* <img src={ImageNotFound} alt="" className="emote-bg2" /> */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="about-emote">
                        <img src={"https://cdn.7tv.app/emote/" + emote.id + "/4x.webp"} alt="" className="emote-bg" />
                        <h2 className="emote-title">
                            <b>{emote.name}</b> is
                        </h2>
                        <div className="btn-wrapper">
                            <button
                                className="btn"
                                onClick={() => {
                                    setShowCounter(true);
                                    if (withRatings) {
                                        emotes[0].ratings < emote.ratings
                                            ? guessedCorrect()
                                            : emotes[0].ratings === emote.ratings
                                            ? guessedCorrect()
                                            : guessedWrong();
                                    } else {
                                        emotes[0].channels < emote.channels
                                            ? guessedCorrect()
                                            : emotes[0].channels === emote.channels
                                            ? guessedCorrect()
                                            : guessedWrong();
                                    }
                                }}
                            >
                                Higher <div className="arrow-up"></div>
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    setShowCounter(true);
                                    if (withRatings) {
                                        emotes[0].ratings > emote.ratings
                                            ? guessedCorrect()
                                            : emotes[0].ratings === emote.ratings
                                            ? guessedCorrect()
                                            : guessedWrong();
                                    } else {
                                        emotes[0].channels > emote.channels
                                            ? guessedCorrect()
                                            : emotes[0].channels === emote.channels
                                            ? guessedCorrect()
                                            : guessedWrong();
                                    }
                                }}
                            >
                                Lower <div className="arrow-down"></div>
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
                    <h1 className="VS">VS</h1>
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

export default Card;
