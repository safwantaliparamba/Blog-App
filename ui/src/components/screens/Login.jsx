import React, { useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/images/login.svg";
import { BASE_URL } from "../axios/config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import Loader from "../UI/Loader";
import { Helmet } from 'react-helmet';

function Login() {
    let navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState("");
    const [is_loading, set_is_loading] = useState(false);

    let dispatch = useDispatch();

    const submitHandler = (e) => {
        set_is_loading(true);
        e.preventDefault();
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        axios
            .post(`${BASE_URL}/auth/login/`, {
                username: username,
                password: password,
            })
            .then((res) => {
                const data = res.data;
                console.log(data);
                dispatch(
                    authActions.login_user({
                        user_data: JSON.stringify(jwt_decode(data.data.access)),
                        token: JSON.stringify(data.data),
                        user:JSON.stringify(data.user_data)
                    })
                );
                set_is_loading(false);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
                set_is_loading(false);
            });
    };

    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            <section id="signup" className="top-pad">
                <div className="wrapper">
                    <div className="right">
                        <h1>Login</h1>
                        <form action="" method="post" onSubmit={submitHandler}>
                            <div className="input-wrapper">
                                <label htmlFor="username">Username</label>
                                <input
                                    ref={usernameRef}
                                    type="text"
                                    id="username"
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    id="password"
                                />
                            </div>
                            {error && <p className="error">{error}</p>}

                            <button type="submit">Login</button>
                            <p>
                                Dont have an account?
                                <Link to="/register">Register</Link>
                            </p>
                        </form>
                    </div>
                    <div className="left">
                        <img src={login} className="wrap" alt="" />
                    </div>
                </div>
            </section>
            {is_loading && <Loader />}
        </>
    );
}

export default Login;
