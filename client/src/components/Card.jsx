import React from "react";
export default function Game({image, name, types}) {
    return(
        <div>
            <div>
            <img src={image} alt="img not found" width="250px" height="200px"/>
            <div>
            <h3>{name}</h3>
            </div>
            <div>
            <h3>{types}</h3>
            </div>
            </div>
        </div>
    )
}