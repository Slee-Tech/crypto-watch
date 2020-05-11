import React, { Component } from "react";
import Suggestions from "./Suggestions";
import {
    getCoins,
    getFilteredCoins,
    getCachedCoins,
} from "../actions/coinActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencySearch: "",
            results: [],
            suggestions: [],
            hasBegunSearching: false,
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkIfSearching = this.checkIfSearching.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.coins.length === 0) {
            this.props.getCoins();
        } else {
            this.props.getCachedCoins();
        }
    }

    handleClick(suggestedCurrency) {
        this.setState({
            currencySearch: suggestedCurrency,
        });
        this.props.getFilteredCoins(suggestedCurrency);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

        setTimeout(() => {
            this.checkIfSearching();
        }, 500);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            submitted: true,
        });
    }

    checkIfSearching() {
        // if (!this.state.hasBegunSearching) {
        //     this.props.getCoins();

        // } else {
        this.props.getFilteredCoins(this.state.currencySearch); // maybe filter the cache at some point?
        // }
        this.setState({
            hasBegunSearching: true,
        });

        if (this.state.currencySearch === "") {
            this.setState({
                hasBegunSearching: false,
            });
        }
    }

    render() {
        if (this.state.submitted) {
            // and add a status check to make sure results are in redux state
            return <Redirect to="/results" />;
        }

        return (
            <div className="home-form">
                <form
                    onSubmit={this.handleSubmit}
                    className="home-search"
                    autocomplete="off"
                >
                    <div className="home-input-form">
                        <input
                            onChange={this.handleChange}
                            name="currencySearch"
                            type="text"
                            value={this.state.currencySearch}
                        ></input>
                        <button type="submit">Search</button>
                    </div>
                </form>
                {this.state.hasBegunSearching ? (
                    <Suggestions clickSuggestion={this.handleClick} />
                ) : (
                    <></>
                )}
            </div>

            // add an onSubmit to a form that will update component state and
            // redirect to results page if submitted, else they clicked directly
            // on a suggested Link, which will be added to SuggestionResult
        );
    }
}
function mapStateToProps(state) {
    const { coins } = state;
    const { filterResults } = state;

    return coins;
}

export default connect(mapStateToProps, {
    getCoins,
    getCachedCoins,
    getFilteredCoins,
})(Search);
