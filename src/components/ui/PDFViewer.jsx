import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { Viewer } from "@react-pdf-viewer/core";

const PDFViewer = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div>
            <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
                <Viewer
                    fileUrl="data/CHAITANAYA-KUSUMAKAR-RESUME.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};

export default PDFViewer;
