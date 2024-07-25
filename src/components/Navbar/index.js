// components/Navbar/index.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 10) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarClass = scrolled ? "div-class scrolled" : "div-class";

    document.querySelectorAll(".link-class").forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const topPosition = window.innerHeight * 0.1;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.scrollY -
                    topPosition;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
    return (
        <nav className={navbarClass}>
            <div className="App-header-left">
                <h1 className="title-class">CHAITFLIX</h1>
                <a className="link-class" href="#Home">
                    Home
                </a>
                <a className="link-class" href="#Projects">
                    Projects
                </a>
                <a className="link-class" href="#Certificates">
                    Certifications
                </a>
                <a className="link-class" href="#Achievements">
                    Achievements
                </a>
                <a className="link-class" href="#Movies">
                    Movies
                </a>
                <a className="link-class" href="#TV-Shows">
                    TV-Shows
                </a>
                <a className="link-class" href="#Songs">
                    Songs
                </a>
            </div>

            <div className="App-header-right">
                <div class="top-background-container">
                    <div class="search-box">
                        <div class="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Isolation_Mode"
                                data-name="Isolation Mode"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                            >
                                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            class="search-input"
                            placeholder="Search your query"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
