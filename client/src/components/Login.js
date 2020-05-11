import React, { Component } from "react";
import { login } from "../actions/authActions";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const userLogin = {
            email: email,
            password: password,
        };

        // attempt to log in user
        this.props.login(userLogin);
    }

    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="d-flex flex-col">
                <div className="col-5">
                    <form onSubmit={this.handleSubmit} className="pt-3">
                        <div className="form-group">
                            <label for="exampleInputEmail1">
                                Email address
                            </label>
                            <input
                                onChange={this.handleChange}
                                value={this.state.email}
                                name="email"
                                type="text"
                                class="form-control form-rounded"
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                            ></input>
                            <small
                                id="emailHelp"
                                className="form-text text-muted"
                            >
                                We WILL sell your email address to hackers.
                            </small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                onChange={this.handleChange}
                                value={this.state.password}
                                name="password"
                                type="password"
                                class="form-control form-rounded"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                            ></input>
                        </div>

                        <button
                            type="submit"
                            className="btn pr-4 pl-4 btn-submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps, { login })(Login);
