import React, { useRef, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate,Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import { BASE_URL } from "../axios/config";
import Loader from "../UI/Loader";

function CreatePost() {
    const navigate = useNavigate();
    const user_data = localStorage.getItem("token");
    const userData = JSON.parse(user_data);

    const [image, setImage] = useState("");
    const [is_loading, set_is_loading] = useState(false);
    const [error, setError] = useState(false);

    console.log(userData?.access);

    const titleRef = useRef();
    const short_descriptionRef = useRef();
    const descriptionRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        set_is_loading(true);
        const formData = new FormData();

        formData.append("image", image);
        formData.append("title", titleRef.current.value);
        formData.append(
            "short_description",
            short_descriptionRef.current.value
        );
        formData.append("description", descriptionRef.current.value);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        console.log(userData?.access);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: `Bearer ${userData?.access}`,
            },
        };
        axios
            .post(`${BASE_URL}/posts/create/`, formData, config)
            .then((res) => {
                const data = res.data;
                console.log(data);
                set_is_loading(false);
                navigate("/");
            })
            .catch((err) => {
                set_is_loading(false);
                console.log(err.message);
                setError(err.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Create post</title>
            </Helmet>
            {is_loading && <Loader />}
            <div className="wrapper">
                <section className="form_container top-pad">
                    <div className="form-container-wrap">
                        <div className="top">
                            <Link to="/" className="btn">
                                go back
                            </Link>
                            <h1>Create Post</h1>
                        </div>
                        <div className="form">
                            <form action="" onSubmit={submitHandler}>
                                <div className="input_container">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        required={true}
                                        ref={titleRef}
                                        type="text"
                                        id="title"
                                    />
                                </div>
                                <div className="input_container">
                                    <label htmlFor="short_description">
                                        Short Description
                                    </label>
                                    <input
                                        required={true}
                                        type="text"
                                        ref={short_descriptionRef}
                                        id="short_description"
                                    />
                                </div>
                                <div className="input_container">
                                    <label htmlFor="image">Image</label>
                                    <input
                                        required={true}
                                        type="file"
                                        id="image"
                                        onChange={(e) =>
                                            setImage(...e.target.files)
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
                                        ref={descriptionRef}
                                        id="description"
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

export default CreatePost;
