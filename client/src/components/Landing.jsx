import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return(
    <div>
        <h1>Welcome to Pokemon Page Henry</h1>
        <Link to = '/home'>
            <button>Go Home</button>
        </Link>
    </div>
    )
}