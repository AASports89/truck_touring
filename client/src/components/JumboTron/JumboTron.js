import React from 'react';
import "./style.css";

function JumboTron() {
    return (
        <div>
            <div id="jumb" className="jumbotron" Style={"margin-top: 2%"}>
                <h1 id="title" className="display-4 text-center myText"><img id="google-image" src="https://res.cloudinary.com/dhqsixgmo/image/upload/v1667907829/1200px-Google_Books_logo_2015.svg_-1024x352_nkqaqs.png" alt="Google Books Logo"></img></h1>
                <br></br>
                <h2 id="s-title" className="text-center myText">📚 Google™ Books Search Powered By: REACT.js & BootStrap 📚</h2>
            </div>
        </div>
    )
}

export default JumboTron;