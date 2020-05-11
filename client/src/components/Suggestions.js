import React, { Component } from "react";
import SuggestionsResult from "./SuggestionResult";
import {
    getCoins,
    getCachedCoins,
    toggleLoading,
} from "../actions/coinActions";
import { connect } from "react-redux";

export class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBegunSearching: false,
            showResults: false,
        };
    }

    async componentDidMount() {
        // add caching logic here //
        // this.setState({
        //     showResults: false,
        // });
        // if (this.props.coins.length === 0) {
        //     this.props.getCoins();
        // } else {
        //     this.props.getCachedCoins();
        // }
        this.props.toggleLoading();
    }

    render() {
        const results = this.props.filtered.map((cur) => {
            return (
                <SuggestionsResult
                    id={cur.id}
                    coin={cur.currency}
                    currencyName={cur.name}
                    clickSuggestion={this.props.clickSuggestion}
                />
            );
        });

        return (
            <div className="suggestions">
                {/* this.props.isLoading ? display one sugresult with spinner/ update loading status to
                be shared accross compnonents in redux */}
                {this.props.isLoading ? (
                    <div className="sug-result">Loading...</div>
                ) : (
                    results
                )}

                {/* {this.state.showResults ? (
                    <div className="suggestions">results</div>
                ) : (
                    <div></div>
                )} */}
                {/* map through state of suggetsions to pass as a prop to each link in SuggestionsResult */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { coins } = state;
    return {
        coins: coins.coins,
        filtered: coins.filterResults,
        isLoading: coins.isLoading,
    };
}

export default connect(mapStateToProps, {
    getCoins,
    getCachedCoins,
    toggleLoading,
})(Suggestions);
