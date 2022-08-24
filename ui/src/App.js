import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/includes/Header";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import { PrivateRoute } from "./components/includes/PrivateRoute";
import CreatePost from "./components/screens/CreatePost";
import NotFound from "./components/screens/NotFound";
import MyPosts from "./components/screens/MyPosts";
import Post from "./components/screens/Post";
import EditPost from "./components/screens/EditPost";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.is_authenticated);

    useEffect(() => {
        if (isAuthenticated) {
            let token = JSON.parse(localStorage.getItem("token"));

            axios
                .post("http://127.0.0.1:8000/api/v1/auth/token/refresh/", {
                    refresh: token.refresh,
                })
                .then((response) => {
                    delete token.access;
                    token.access = response.data.access;
                    localStorage.setItem("token", JSON.stringify(token));
                })
                .catch((error) => console.log(error));
        }
    }, [isAuthenticated]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="" index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/posts/:id/"
                    element={
                        <PrivateRoute>
                            <Post />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/posts/:id/edit/"
                    element={
                        <PrivateRoute>
                            <EditPost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <PrivateRoute>
                            <CreatePost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-posts"
                    element={
                        <PrivateRoute>
                            <MyPosts />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
