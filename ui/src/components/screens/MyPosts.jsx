import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

import { BASE_URL } from "../axios/config";
import PostCard from "../includes/PostCard";

function MyPosts(props) {
    const [posts, setPosts] = useState([]);
    const [noPosts, setNoPosts] = useState(false);

    const userData = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const config = {
            headers: {
                authorization: `Bearer ${userData?.access}`,
            },
        };
        axios
            .get(`${BASE_URL}/posts/my-posts/`, config)
            .then((response) => {
                if (response.data.length === 0) {
                    setNoPosts(true);
                }
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const loadPosts = () => {
        return posts.map((post) => (
            <PostCard
            style={{
                'width':'23%'
            }}
                username={post.author.name}
                image={post.image}
                id={post.id}
                title={post.title}
                description={post.short_description}
                date={post.timestamp}
                key={post.id}
                userId={post.author.id}
                setState={setPosts}
            />
        ));
    };

    return (
        <>
            <Helmet>
                <title>My Posts</title>
            </Helmet>
            <div className="top-pad">
                <section id="post-and-sort">
                    <div className="wrapper">
                        <section
                            id="posts"
                            style={{
                                width: "100%",
                            }}
                        >
                            <h1>MY POSTS</h1>
                            <ul className="posts">{loadPosts()}</ul>
                            {noPosts && <h1>No posts found</h1>}
                        </section>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MyPosts;
