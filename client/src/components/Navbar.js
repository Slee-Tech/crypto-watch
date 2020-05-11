import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout";

class Navbar extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth;

        const authLinks = (
            <>
                <Link to="/">{user ? `Welcome, ${user.name}` : ""}</Link>
                <Logout />
            </>
        );

        const guestLinks = (
            <>
                <Link to="/login">Login</Link>

                <Link id="btn-register" to="/register">
                    Register
                </Link>
            </>
        );
        return (
            <nav className="navbar">
                <Link to="/">
                    <div className="logo">CryptoWatch</div>
                </Link>

                <div className="links">
                    {isAuthenticated ? authLinks : guestLinks}
                    <Link to="/dashboard">Results</Link>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps, null)(Navbar);
