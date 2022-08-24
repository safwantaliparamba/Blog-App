import React, { useState } from "react";
import { Link } from "react-router-dom";

function PostCard({ username, image, id, title, description, date, style }) {
    const newDate = new Date(date);
    const converted_date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;

    return (
        <>
            <li style={style}>
                <div className="head">
                    <h5>{username}</h5>
                </div>
                <img loading="lazy" src={image} alt="demo title" />
                <Link to={`/posts/${id}/`}>
                    <h5>{title}</h5>
                </Link>
                <p>{description}</p>
                <span>{converted_date}</span>
            </li>
        </>
    );
}

export default PostCard;
