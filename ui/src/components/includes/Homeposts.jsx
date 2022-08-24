import React, { useState, useEffect } from "react";
import axios from "axios";

import PostCard from "./PostCard";
import search from "../../assets/images/search.svg";
import { BASE_URL } from "../axios/config";

function Homeposts() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        const url = `${BASE_URL}/posts`
        axios
            .get(`${url}?sort=${sort}`)
            .then((resp) => {
                setPosts(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [sort]);

    const loadPosts = () => {
        return posts
            .filter((post) => {
                if (searchTerm === "") {
                    return post;
                } else if (
                    post.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    post.short_description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                ) {
                    return post;
                }
            })
            .map((post) => (
                <PostCard
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
        <section id="post-and-sort">
            <section id="posts">
                <h1>POSTS</h1>
                <div className="head">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            placeholder="Search here..."
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                console.log(searchTerm);
                            }}
                        />
                        <button type="submit">
                            <img src={search} className="wrap" alt="" />
                        </button>
                    </form>
                </div>
                <ul className="posts">{loadPosts()}</ul>
            </section>
            <div className="filter">
                <h1>sort posts</h1>
                <form action="">
                    <div className="input-container">
                        <input
                            type="radio"
                            id="title-asc"
                            onChange={(e) => setSort("title_asc")}
                            name="sort"
                        />
                        <label htmlFor="title-asc">Title Ordered By Asc</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="radio"
                            id="title-desc"
                            onChange={(e) => setSort("title_desc")}
                            name="sort"
                        />
                        <label htmlFor="title-desc">
                            Title Ordered By Desc
                        </label>
                    </div>
                    <div className="input-container">
                        <input
                            type="radio"
                            id="date-asc"
                            onChange={(e) => setSort("date_asc")}
                            name="sort"
                        />
                        <label htmlFor="date-asc">
                            Order By Date Posted Asc
                        </label>
                    </div>
                    <div className="input-container">
                        <input
                            type="radio"
                            id="date-desc"
                            onChange={(e) => setSort("date_desc")}
                            name="sort"
                        />
                        <label htmlFor="date-desc">
                            Order By Date Posted Desc
                        </label>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Homeposts;
