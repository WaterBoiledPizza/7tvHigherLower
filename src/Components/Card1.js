import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import correctSVG from "../SVGs/correct.svg";
import wrongSVG from "../SVGs/wrong.svg";
import "../App.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

// let emoteArray = database.emotes;
// console.log(emoteArray);

function Card1(props) {
    const navigate = useNavigate();

    const [emoteArray, setEmoteArray] = useState([
        {
            channels: {
                total: 0,
                __typename: "",
            },
            id: "",
            name: "",
            __typename: "",
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

    const GET_EMOTES = gql`
        query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {
            emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {
                items {
                    id
                    name
                    channels(page: $page, limit: $limit) {
                        total
                    }
                }
            }
        }
    `;

    const EMOTES_QUERY_VARIABLE = (cat) => {
        return {
            query: "",
            limit: 100,
            page: 1,
            sort: {
                value: "popularity",
                order: "DESCENDING",
            },
            filter: {
                category: cat,
                exact_match: false,
                case_sensitive: false,
                ignore_tags: true,
                zero_width: false,
                animated: false,
                aspect_ratio: "",
            },
        };
    };

    const emotesQuery = useQuery(GET_EMOTES, {
        variables: EMOTES_QUERY_VARIABLE(id),
    });

    // console.log(emotesQuery.loading, emotesQuery.error, emotesQuery.data);

    useEffect(() => {
        if (localStorage.getItem(id) === null) {
            if (emotesQuery.loading === false) {
                setEmoteArray(emotesQuery.data.emotes.items);
                localStorage.setItem(id, JSON.stringify(emotesQuery.data.emotes.items));
            }
        } else {
            setEmoteArray(JSON.parse(localStorage.getItem(id)));
        }
    }, [emotesQuery.loading]);

    useEffect(() => {
        // console.log(emoteArray);
        // Picking Random Emotes from an Array
        const rnum1 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
        var rnum2 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
        while (rnum2.id === rnum1.id && rnum1.id) {
            rnum2 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
        }

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
                        var rnum3 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
                        while (rnum3.id === emotes[0].id && rnum3.id === emotes[1].id) {
                            rnum3 = emoteArray[Math.floor(Math.random() * emoteArray.length)];
                        }
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
            return (
                <CountUp
                    className="counter"
                    style={showCounter ? { opacity: 1 } : { opacity: 0 }}
                    end={showCounter ? emotes[1].channels.total : 0}
                    duration={0.3}
                    separator=","
                >
                    times
                </CountUp>
            );
        }

        function thousandSeperator(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const displayEmotes = emotes.map((emote, index) => {
            if (index === 0) {
                return (
                    // <motion.div exit={{ x: "-50%" }} className="section1">
                    <motion.div className={animate ? "section1-animate" : "section1"}>
                        <div className="about-emote">
                            <img src={"https://cdn.7tv.app/emote/" + emote.id + "/4x.webp"} alt="" className="emote-bg" />
                            <h2 className="emote-title">{emote.name}</h2>
                            <div>is enabled in</div>
                            <h3>{thousandSeperator(emote.channels.total)} </h3>
                            <div>channels</div>
                            <span className="counter">‎</span>
                        </div>
                    </motion.div>
                );
            } else {
                return (
                    <motion.div className={animate ? "section2-animate" : "section2"}>
                        {animate ? <div className="section3"></div> : null}
                        <motion.div className="about-emote">
                            <img src={"https://cdn.7tv.app/emote/" + emote.id + "/4x.webp"} alt="" className="emote-bg" />
                            <h2 className="emote-title">{emote.name}</h2>
                            <div>is enabled</div>
                            <div className="btn-wrapper">
                                <button
                                    disabled={showCounter ? true : false}
                                    className="btn"
                                    onClick={(e) => {
                                        setShowCounter(true);
                                        emotes[0].channels.total < emote.channels.total
                                            ? guessedCorrect()
                                            : emotes[0].channels.total === emote.channels.total
                                            ? guessedCorrect()
                                            : guessedWrong();
                                    }}
                                >
                                    More <div className="arrow-up"></div>
                                </button>
                                <button
                                    className="btn"
                                    disabled={showCounter ? true : false}
                                    onClick={(e) => {
                                        setShowCounter(true);
                                        emotes[0].channels.total > emote.channels.total
                                            ? guessedCorrect()
                                            : emotes[0].channels.total === emote.channels.total
                                            ? guessedCorrect()
                                            : guessedWrong();
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
                        <h2>SOMEGALUL BAD </h2>
                        <h3>You Score: {score}</h3>
                        <Link reloadDocument to={`/game/${id}`} onClick={() => window.location.reload()}>
                            <div>Try again</div>
                            {/* <div style={{ fontSize: 12 }}>Reload page if link doesn't work</div> */}
                        </Link>
                        <Link to={`/`}>Home</Link>
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
            <div className="layout">
                <button
                    onClick={() => {
                        navigate(`/`);
                    }}
                >
                    <h3>Back</h3>
                </button>
                <div className="Game">
                    <AnimatePresence>
                        <DisplayCards />
                        <AnimateAnswer />
                        {lost === "true" ? <YouLost /> : null}
                    </AnimatePresence>
                </div>
                {/* <Chat id={id} /> */}
            </div>
        );
    } else {
        return (
            <div className="loading">
                <img src="https://cdn.7tv.app/emote/6256e1e6c2be2d716f88e09a/4x.webp" alt="LADINK..."></img>
                GENERATING GOD SEED...
            </div>
        );
    }
}

export default Card1;
