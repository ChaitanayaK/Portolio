import React, { useEffect, useState } from "react";
import "./index.css";
import Carousal from "../components/ui/Carousel.jsx";
import PDFViewer from "../components/ui/PDFViewer.jsx";
import { getDocument } from "pdfjs-dist";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
    const [data, setData] = useState(null);
    const [resumeContent, setResumeContent] = useState("");
    const [genAiResponse, setGenAiResponse] = useState("");

    useEffect(() => {
        fetch("data/data.json")
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData))
            .catch((error) => console.error("Error loading JSON:", error));
    }, []);

    useEffect(() => {
        const extractTextFromPDF = async () => {
            const pdfUrl = "data/CHAITANAYA-KUSUMAKAR-RESUME.pdf";
            const pdf = await getDocument(pdfUrl).promise;
            let text = "";
            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const content = await page.getTextContent();
                const strings = content.items.map((item) => item.str);
                text += strings.join(" ") + "\n";
            }
            setResumeContent(text);
        };

        extractTextFromPDF();
    }, []);

    const showResume = () => {
        const resumeDiv = document.getElementById("resume-div");
        const parentDiv = document.getElementById("parent-main-div");

        const resumeDivStyle = window.getComputedStyle(resumeDiv).display;
        if (resumeDivStyle === "none") {
            resumeDiv.style.display = "block";
            parentDiv.style.display = "flex";
            window.showBigDiv = true;
        } else {
            resumeDiv.style.display = "none";
            parentDiv.style.display = "none";
            window.showBigDiv = false;
        }
    };

    const handleClick = async () => {
        const userPrompt = document.getElementById("prompt-input-id").value;
        document.getElementById("prompt-input-id").value = "";

        const prompt = `Answer questions using Chaitanaya's resume, answer medium length and precise, |${userPrompt}| resume:${resumeContent}`;

        const genAI = new GoogleGenerativeAI(
            process.env.REACT_APP_GOOGLE_API_KEY
        );
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
        });
        const outputP = document.getElementById("response-text-id");
        const result = await model.generateContentStream([prompt]);

        var aiResponse = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            aiResponse += chunkText;
            outputP.textContent = aiResponse;
        }
    };

    if (window.showBigDiv) {
        console.log("Print");
        showResume();
    }

    return (
        <>
            <div id="overlay-main">
                <div id="parent-main-div" className="parent-main-div">
                    <div id="resume-div" className="child-resume-div">
                        <button onClick={showResume} className="close-button">
                            X
                        </button>
                        <PDFViewer />
                        <div>
                            <p
                                id="response-text-id"
                                style={{ color: "#eeefee" }}
                            ></p>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "fit-content",
                            }}
                        >
                            <input
                                style={{
                                    fontSize: "15px",
                                    paddingInlineStart: "10px",
                                    color: "#eeefee",
                                    width: "80%",
                                    height: "30px",
                                    borderRadius: "5px",
                                    backgroundColor: "#2f2f2f",
                                    boxShadow: "#181818 5px",
                                    borderColor: "#000000",
                                }}
                                id="prompt-input-id"
                                type="text"
                                placeholder="Ask anything about Chaitanaya 😊"
                            />
                            <button
                                style={{
                                    margin: "5px",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    background: "#196399",
                                    color: "#eeefee",
                                    fontSize: "25px",
                                    width: "10%",
                                }}
                                onClick={handleClick}
                            >
                                Ask
                            </button>
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <img
                        id="Home"
                        className="image"
                        style={{ borderRadius: 0 }}
                        src="only-me-bg.png"
                        alt="awesome-image"
                    />
                    <div className="bg-text-container">
                        <h2>#1 in Engineers Today</h2>
                        <p>
                            He is an innovative and dedicated Computer
                            Engineering and Techno-Management student with a
                            passion for software development.
                        </p>
                        <div>
                            <button className="main-button play">
                                <b>Play</b>
                            </button>
                            <button
                                onClick={showResume}
                                className="main-button more-info"
                            >
                                <b>More Info</b>
                            </button>
                        </div>
                    </div>
                </div>
                {data &&
                    Object.keys(data).map((category) => (
                        <section id={category}>
                            <Carousal
                                key={category}
                                title={category}
                                images={data[category]}
                            />
                        </section>
                    ))}
            </div>
        </>
    );
};

export default Home;
