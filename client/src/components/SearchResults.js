import React, { Component } from "react";
import SearchResult from "./SearchResult";
import Search from "./Search";
import { getCoins, getCachedCoins } from "../actions/coinActions";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

export class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            activePage: 1,
        };
        this.itemsCountPerPage = 10;

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        console.log(`changing to page ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        window.scrollTo(0, 0);
    }

    render() {
        const currentPageResultsStart = (this.state.activePage - 1) * 24;
        console.log(`results start: ${currentPageResultsStart}`);

        const currentPageResultsEnd = currentPageResultsStart + 24;
        console.log(`results end: ${currentPageResultsEnd}`);
        const results = this.props.filtered
            .slice(currentPageResultsStart, currentPageResultsEnd)
            .map((cur) => {
                return (
                    <div>
                        <SearchResult
                            id={cur.id}
                            coin={cur.currency}
                            currencyName={cur.name}
                            logo={cur.logo_url}
                        />
                    </div>
                );
            });
        return (
            <div>
                <div className="search-results-header">Search Results:</div>
                <div className="search-results">
                    {/* map through state of suggetsions to pass as a prop to each link in SuggestionsResult */}
                    {results}
                </div>
                <div className="pagination-container">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={24}
                        totalItemsCount={this.props.filtered.length}
                        pageRangeDisplayed={Math.ceil(
                            this.props.filtered.length / 24
                        )} //maybe add 24 to class variable
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { coins } = state;
    return {
        filtered: coins.filterResults,
    };
}

export default connect(mapStateToProps, null)(SearchResults);
