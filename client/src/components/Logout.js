import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { Link } from "react-router-dom";

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        console.log("clicked the logout button");
        this.props.logout();
    }
    render() {
        return (
            <>
                <Link
                    onClick={this.handleLogout}
                    className="nav-link mt-1 mb-1 ml-3 btn btn-register  pr-4 pl-4"
                    id="btn-register"
                >
                    Logout
                </Link>
            </>
        );
    }
}

export default connect(null, { logout })(Logout);
