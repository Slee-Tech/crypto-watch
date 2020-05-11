import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SuggestionResult extends Component {
    render() {
        return (
            <div className="sug-result">
                <p
                    onClick={() => {
                        this.props.clickSuggestion(this.props.currencyName);
                    }}
                >
                    {this.props.currencyName}
                </p>
                {/* <Link to={`/results/${this.props.id}`}>
                    {this.props.coin}: {this.props.currencyName}
                </Link> */}
            </div>
        );
    }
}

export default SuggestionResult;
