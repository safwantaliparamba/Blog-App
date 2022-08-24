import React from "react";
import { Helmet } from "react-helmet";

import Homeposts from "../includes/Homeposts";

function Home() {
    return (
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <section id="home" className="top-pad">
                <div className="wrapper">
                    <Homeposts />
                </div>
            </section>
        </>
    );
}

export default Home;
