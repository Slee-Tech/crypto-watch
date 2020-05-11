import React, { Component } from "react";
import { getUserCoins } from "../actions/coinActions";
import { connect } from "react-redux";

export class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserCoins();
    }

    render() {
        const currentUserCoins = this.props.userCoins.map((coin) => {
            return <p>{coin.name}</p>;
        });

        return (
            <div>
                <h2>User Coins</h2>
                {currentUserCoins}
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { coins } = state;
    return {
        userCoins: coins.currentUserCoins,
    };
}

export default connect(mapStateToProps, { getUserCoins })(Dashboard);
