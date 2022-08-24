import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useParams, useNavigate, Link } from "react-router-dom";

import { BASE_URL } from "../axios/config";
import Modal from "../UI/Modal";

function Post() {
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);
    const [showDeleted, setShowDeleted] = useState(false);
    let [isAuthor, setisAuthor] = useState(false);

    const { id } = useParams();
    const userData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let url = `http://127.0.0.1:8000/api/v1/posts/${id}/`;
            await axios
                .get(url)
                .then((resp) => {
                    if (resp.data.title === "not found") {
                        navigate("/");
                    } else {
                        setPost(resp.data);
                        if (post.author?.id === userData?.user_id) {
                            setisAuthor(true);
                        }
                    }
                })
                .catch((err) => {
                    setError(err.message);
                });
        };
        fetchData();
    }, [post.author?.id]);

    const deleteHandler = (e) => {
        const userData = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                authorization: `Bearer ${userData?.access}`,
            },
        };
        axios
            .delete(`${BASE_URL}/posts/${id}/delete/`, config)
            .then((res) => {
                if (res.data.title === "success") {
                    navigate("/");
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const newDate = new Date(post.timestamp);
    const converted_date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    return (
        <>
            {showDeleted && (
                <Modal onClick={(e) => setShowDeleted(!showDeleted)}>
                    <h1>Are you sure</h1>
                    <h5>You sure you want to delete this post</h5>
                    <div className="bottom">
                        <span
                            className="delete"
                            onClick={(e) => {
                                deleteHandler();
                                setShowDeleted(false);
                            }}
                        >
                            Delete
                        </span>
                    </div>
                </Modal>
            )}
            <Helmet>
                <title>{post.title}</title>
            </Helmet>
            <section id="single-post" className="top-pad">
                <div className="wrapper">
                    <h1>{post.title}</h1>
                    <p className="short-description">
                        {post.short_description}
                    </p>
                    <div className="img-wrapper">
                        <img src={post.image} alt="" />
                    </div>
                    <h5>
                        posted by <span>{post.author?.name}</span>
                    </h5>
                    <p>{post.description}</p>
                    <p>
                        posted on <span>{converted_date}</span>
                    </p>
                    {isAuthor && (
                        <div className="bottom">
                            <span
                                className="delete"
                                onClick={(e) => setShowDeleted(true)}
                            >
                                Delete
                            </span>
                            <Link to="edit/">
                                <span className="delete edit">Edit</span>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Post;
