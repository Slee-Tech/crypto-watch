import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { Route, Redirect } from "react-router-dom";

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
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
        // submit register form to authAction register
        e.preventDefault();
        const { name, email, password } = this.state;
        const newUser = {
            name: name,
            email: email,
            password: password,
        };

        // attempt to register new user
        this.props.register(newUser);
    }
    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="row justify-content-center">
                <div className="col-5">
                    <form onSubmit={this.handleSubmit} className="pt-3">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input
                                onChange={this.handleChange}
                                value={this.state.name}
                                name="name"
                                type="text"
                                className="form-control form-rounded"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">
                                Email address
                            </label>
                            <input
                                onChange={this.handleChange}
                                value={this.state.email}
                                name="email"
                                type="text"
                                className="form-control form-rounded"
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
                                className="form-control form-rounded"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                            ></input>
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">
                                Confirm Password
                            </label>
                            <input
                                onChange={this.handleChange}
                                value={this.state.passwordConfirm}
                                name="passwordConfirm"
                                type="password"
                                className="form-control form-rounded"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                            ></input>
                        </div>

                        <button
                            type="submit"
                            className="btn pr-4 pl-4 btn-register"
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

export default connect(mapStateToProps, { register })(Register);
