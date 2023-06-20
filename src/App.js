import "./App.css";
import React, { useState, useEffect } from "react";
import Card1 from "./Components/Card1";
import Card2 from "./Components/Card2";
import Home from "./Home";
import NotFound from "./NotFound";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function App() {
    const client = new ApolloClient({
        uri: "https://7tv.io/v3/gql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <main className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game1/:id" element={<Card1 />} />
                        <Route path="/game2/:id" element={<Card2 />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </HashRouter>
        </ApolloProvider>
    );
}

export default App;
