import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getCoins } from "./actions/coinActions";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchDetails from "./components/SearchDetails";
import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import Register from "./components/Register";
import { loadUser } from "./actions/authActions";
import Dashboard from "./components/Dashboard";

class App extends React.Component {
    componentDidMount() {
        // store.dispatch(test());
        // /* use this onChange in search input, to first fetch symbols and cache in Redux?
        // https://api.nomics.com/v1/currencies/ticker?key=24e295ec3c16f93ee8f38c7a4569b3bb&interval=1d,30&convert=EUR
        // */
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <Navbar />

                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route
                                exact
                                path="/results"
                                component={SearchResults}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route
                                exact
                                path="/results/:id"
                                component={SearchDetails}
                            />
                            <Route
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                        </Switch>
                    </div>
                </Provider>
            </Router>
        );
    }
}

export default App;
