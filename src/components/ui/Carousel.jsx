import React, { useState, useEffect } from "react";
import "./Carousel.css";
import PropTypes from "prop-types";
import PDFViewer from "./PDFViewer";

const Carousel = ({ title, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const divClassName = title === "Songs" ? "song-div" : "";
    const imageClassName = title === "Songs" ? "song-image" : "image-carousel";

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, images.length - carousel_length)
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    var carousel_length;
    if (window.matchMedia("(max-width: 600px)").matches) {
        carousel_length = 2;
    } else if (window.matchMedia("(min-width: 1400px)").matches) {
        carousel_length = 6;
    } else if (window.matchMedia("(min-width: 1200px)").matches) {
        carousel_length = 5;
    } else if (window.matchMedia("(min-width: 820px)").matches) {
        carousel_length = 3;
    }

    const isFirstItem = currentIndex === 0;
    const isLastItem = currentIndex === images.length - carousel_length;
    let renderButton;
    if (images.length <= carousel_length) {
        renderButton = true;
    } else {
        renderButton = false;
    }
    const handleRedirect = (url) => {
        // window.location.href = url;
        window.open(url, "_blank");
    };

    return (
        <>
            <div id="content-main-div" className="parent-main-div">
                <div id="content-div" className="child-resume-div">
                    <button  className="close-button">
                        X
                    </button>
                </div>
            </div>
            <div style={{ position: "relative" }}>
                <div className="title-header-class">
                    <h2>{title}</h2>
                </div>
                <div className="carousel-container">
                    <button
                        onClick={handlePrev}
                        className="carousel-control prev"
                        style={{
                            display: isFirstItem ? "none" : "block",
                        }}
                    >
                        <b>&lt;</b>
                    </button>
                    <div className="carousel-content">
                        {images
                            .slice(currentIndex, currentIndex + carousel_length)
                            .map((item, index) => (
                                <span key={index} className="item">
                                    <div className={divClassName}>
                                        <img
                                            style={{ cursor: "pointer" }}
                                            className={imageClassName}
                                            src={item.url}
                                            alt={item.name}
                                            onClick={() =>
                                                handleRedirect(item.redirect)
                                            }
                                        />
                                    </div>

                                    <div
                                        className="details-class"
                                        style={{ cursor: "default" }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "fit-content",
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                        <div
                                            style={{
                                                width: "inherit",
                                                display: "flex",
                                                flexDirection: "row",
                                                marginTop: "5px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "50%",
                                                    paddingLeft: "15px",
                                                }}
                                            >
                                                <div
                                                    className="play-button"
                                                    onClick={() =>
                                                        handleRedirect(
                                                            item.redirect
                                                        )
                                                    }
                                                >
                                                    <img
                                                        style={{
                                                            maxWidth: "20px",
                                                        }}
                                                        src="play-button.png"
                                                        alt="drop"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    paddingRight: "15px",
                                                    width: "50%",
                                                    display: "flex",
                                                    justifyContent: "right",
                                                }}
                                            >
                                                <div
                                                    className="drop-button"
                                                    // onClick={() =>
                                                        
                                                    // }
                                                >
                                                    <img
                                                        style={{
                                                            maxWidth: "20px",
                                                        }}
                                                        src="drop-down.png"
                                                        alt="drop"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            ))}
                    </div>
                    <button
                        id="next-btn-id"
                        onClick={handleNext}
                        className="carousel-control next"
                        style={{
                            display:
                                isLastItem || renderButton ? "none" : "block",
                        }}
                    >
                        <b>&gt;</b>
                    </button>
                </div>
            </div>
        </>
    );
};

Carousel.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Carousel;
