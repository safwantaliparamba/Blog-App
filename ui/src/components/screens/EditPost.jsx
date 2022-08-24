import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

import { BASE_URL } from "../axios/config";
import Loader from "../UI/Loader";

function EditPost() {
    const { id } = useParams();

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("token"));

    const [is_loading, set_is_loading] = useState(false);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [newImage, setNewImage] = useState("");
    const [oldImage, setOldImage] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        set_is_loading(true);
        const formData = new FormData();

        formData.append("image", newImage);
        formData.append("title", title);
        formData.append("short_description", shortDescription);
        formData.append("description", description);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `Bearer ${userData?.access}`,
            },
        };
        axios
            .patch(`${BASE_URL}/posts/${id}/edit/`, formData, config)
            .then((res) => {
                const data = res.data;
                console.log(data);
                set_is_loading(false);
                navigate(`/posts/${id}/`);
            })
            .catch((err) => {
                set_is_loading(false);
                console.log(err.message);
                setError(err.message);
            });
    };

    useEffect(() => {
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `Bearer ${userData?.access}`,
            },
        };
        axios
            .get(`${BASE_URL}/posts/${id}/edit/`, config)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setShortDescription(res.data.short_description);
                setOldImage(res.data.image);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>Edit post</title>
            </Helmet>
            {is_loading && <Loader />}
            <div className="wrapper">
                <section className="form_container top-pad">
                    <div className="form-container-wrap">
                        <div className="top">
                            <Link to={`/posts/${id}/`} className="btn">
                                go back
                            </Link>
                            <h1>Edit Post</h1>
                        </div>
                        <div className="form">
                            <form action="" onSubmit={submitHandler}>
                                <div className="input_container">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        required={true}
                                        type="text"
                                        id="title"
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        value={title}
                                    />
                                </div>
                                <div className="input_container">
                                    <label htmlFor="short_description">
                                        Short Description
                                    </label>
                                    <input
                                        required={true}
                                        type="text"
                                        id="short_description"
                                        onChange={(e) => {
                                            setShortDescription(e.target.value);
                                        }}
                                        value={shortDescription}
                                    />
                                </div>
                                <div className="input_container">
                                    <label htmlFor="image">Image</label>
                                    <a href={oldImage}>{oldImage}</a>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) =>
                                            setNewImage(e.target.files[0])
                                        }
                                    />
                                </div>
                                <div className="input_container">
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        required={true}
                                        rows="5"
                                        id="description"
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        value={description}
                                    ></textarea>
                                </div>
                                {error && <p className="error">{error}</p>}

                                <button type="submit">Create Post</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default EditPost;
