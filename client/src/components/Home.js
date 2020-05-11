import React, { Component } from "react";
import Search from "./Search";
import background from "../images/background.svg";

export class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-title">
                    <h1>Search for a Crypto-Currency.</h1>
                </div>
                <img className="bg-image" src={background} alt="background" />
                <Search />
            </div>
        );
    }
}

export default Home;
