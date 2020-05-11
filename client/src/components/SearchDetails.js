import React, { Component } from "react";
import { getDetails, addCurrentCoin } from "../actions/coinActions";
import { connect } from "react-redux";
import back from "../images/back.svg";

// this is more of a details page
export class SearchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false,
        };
    }
    componentDidMount() {
        this.props.getDetails(this.props.match.params.id);
    }

    handleClick = () => {
        this.props.history.goBack();
    };

    addCoin = () => {
        this.setState({
            btnDisabled: true,
        });
        const coin = {
            name: this.props.details.name,
            currencyId: this.props.details.id,
            logoUrl: this.props.details.logo_url,
        };
        this.props.addCurrentCoin(coin);
    };
    render() {
        // const details = this.props.details["1d"];
        // details = JSON.parse(details);
        // console.log(Object.entries(details));
        // const details = Object.keys(this.props.details["1d"]).map((detail) => {
        //     console.log(this.props.details["1d"][detail]);
        // });

        return (
            <div className="search-details">
                <div className="details-header">
                    <h1>{this.props.details.id}</h1>
                </div>

                <div className="symbol-container">
                    <img
                        className="img-details"
                        src={this.props.details.logo_url}
                    />
                </div>

                <div className="details-info-currency">
                    <span className="header">Currency:</span>{" "}
                    <span className="header-bold">
                        {this.props.details.name}
                    </span>
                </div>
                <div className="details-info-symbol">
                    <span className="header">Symbol:</span>{" "}
                    <span className="header-bold">
                        {this.props.details.name}
                    </span>
                </div>
                <div className="details-info-price">
                    <span className="header">Price:</span>
                    <span className="header-bold">
                        {this.props.details.price}
                    </span>
                </div>

                <div className="back-button-area">
                    <img
                        className="back-button"
                        src={back}
                        alt="backbutton"
                        onClick={this.handleClick}
                    />
                    <p className="back-text">Back to Results</p>
                </div>

                <button
                    className="add-button"
                    alt="add button"
                    onClick={this.addCoin}
                    disabled={this.state.btnDisabled}
                >
                    Add This Currency
                </button>

                <div className="description">
                    <h1 className="details-header-purple d-flex">Data</h1>
                    <div className="data-info">
                        <div className="d-flex flex-col">
                            <h5 className="header">Rank:</h5>
                            <h5>{this.props.details.rank}</h5>
                        </div>

                        <div className="d-flex flex-col">
                            <h5 className="header">Price Date:</h5>
                            <h5>{this.props.details.price_date}</h5>
                        </div>

                        <div className="d-flex flex-col">
                            <h5 className="header">Price Timestamp:</h5>
                            <h5>{this.props.details.price_timestamp}</h5>
                        </div>
                        <div className="d-flex flex-col">
                            <h5 className="header">Market Cap:</h5>
                            <h5>{this.props.details.market_cap}</h5>
                        </div>

                        <div className="d-flex flex-col">
                            <h5 className="header">Circulating Supply:</h5>
                            <h5>{this.props.details.circulating_supply}</h5>
                        </div>

                        <div className="d-flex flex-col">
                            <h5 className="header">High:</h5>
                            <h5>{this.props.details.high}</h5>
                        </div>
                        <div className="d-flex flex-col">
                            <h5 className="header">High Timestamp:</h5>
                            <h5>{this.props.details.high_timestamp}</h5>
                        </div>

                        {Object.keys(this.props.oneDay).length > 0 ? (
                            <>
                                <div className="d-flex flex-col">
                                    <h5 className="header">
                                        1 Day Price Change:
                                    </h5>
                                    <h5>{this.props.oneDay.price_change}</h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">
                                        1 Day Price Change:
                                    </h5>
                                    <h5>
                                        {this.props.oneDay.price_change_pct}
                                    </h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">
                                        1 Day Price Change %:
                                    </h5>
                                    <h5>{this.props.oneDay.price_change}%</h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">1 Day Volume:</h5>
                                    <h5>{this.props.oneDay.volume}</h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">
                                        1 Day Volume Change:
                                    </h5>
                                    <h5>{this.props.oneDay.volume_change}</h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">Volume Change %:</h5>
                                    <h5>
                                        {this.props.oneDay.volume_change_pct}%
                                    </h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">
                                        Market Cap Change:
                                    </h5>
                                    <h5>
                                        {this.props.oneDay.market_cap_change}
                                    </h5>
                                </div>

                                <div className="d-flex flex-col">
                                    <h5 className="header">
                                        Market Cap Change %:
                                    </h5>
                                    <h5>
                                        {
                                            this.props.oneDay
                                                .market_cap_change_pct
                                        }
                                    </h5>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { coins } = state;
    return {
        details: coins.currentDetails,
        oneDay: coins.currentDayDetails,
    };
}

export default connect(mapStateToProps, {
    getDetails,
    addCurrentCoin,
})(SearchDetails);
