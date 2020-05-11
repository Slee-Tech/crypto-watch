import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SearchResult extends Component {
    render() {
        return (
            <div className="search-result">
                <img className="search-results-logo" src={this.props.logo} />
                <Link to={`/results/${this.props.id}`}>
                    {this.props.coin}: {this.props.currencyName}
                </Link>
            </div>
        );
    }
}

export default SearchResult;
