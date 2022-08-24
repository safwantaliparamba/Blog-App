import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
// import { searchAction } from "../store/searchSlice";

export default function Header() {
    const is_authenticated = useSelector(
        (state) => state.auth.is_authenticated
    );
    // const search = useSelector((state) => state.search.term);
    const dispatch = useDispatch();

    return (
        <header>
            <h1>
                <NavLink to="/"> BlogApp </NavLink>
            </h1>

            {/* <form onSubmit={e => e.preventDefault()} >
                <input type="search" placeholder="Search here..." onChange={(e) =>{
                    dispatch(searchAction.setSearchTerm({
                        payload:{
                            searchTerm:e.target.value
                        } 
                    }))
                    console.log(search);
                }} name="q" />
                <button type="submit">
                    <img src={search} className="wrap" alt="" />
                </button>
            </form> */}
            <nav>
                {is_authenticated ? (
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">Create Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-posts">My Posts</NavLink>
                        </li>
                        <li>
                            <button
                                className="logout"
                                onClick={() => dispatch(authActions.logout())}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/login" className="auth login">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="auth register">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
