import { useState } from "react";
import './topBar.css'

function topBar() {
    return (
        <>
            <div className = 'bar-container'>
                <div className="left">
                    <text className="title-text">Baileys</text>
                </div>
                <div className="right">
                    <text className="button-text">
                        Home
                    </text>
                    <text className="button-text">
                        Risk
                    </text>
                    <text className="button-text">
                        FM
                    </text>
                    <text className="button-text">
                        Logout
                    </text>
                </div>
            </div>
        </>
    )
}

export default topBar;