import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'

import login from "../../assets/images/login.svg";
import { BASE_URL } from "../axios/config";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import Loader from "../UI/Loader";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();

    const [image, setImage] = useState("");
    const [is_loading, set_is_loading] = useState(false);

    const signupHandler = (e) => {
        set_is_loading(true);
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("username", usernameRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("name", nameRef.current.value);
        formData.append("username", usernameRef.current.value);
        formData.append("image", image);

        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        axios
            .post(`${BASE_URL}/auth/register/`, formData, config)
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
                set_is_loading(false);
            });
    };

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <section id="signup" className="top-pad">
                <div className="wrapper">
                    <div className="left">
                        <img src={login} className="wrap" alt="" />
                    </div>
                    <div className="right">
                        <h1>Register</h1>
                        <form
                            onSubmit={signupHandler}
                            encType="multipart/form-data"
                        >
                            <div className="input-wrapper">
                                <label htmlFor="name">Name</label>
                                <input ref={nameRef} type="text" id="name" />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="email">Email</label>
                                <input ref={emailRef} type="email" id="email" />
                            </div>
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
                            <div className="input-wrapper">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => {
                                        setImage(...e.target.files);
                                    }}
                                />
                            </div>
                            <button type="submit">Register</button>
                            <p>
                                Already have an account?
                                <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
            {is_loading && <Loader />}
        </>
    );
}

export default Register;
