import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addWritingData } from "../services/firestoreService.js";
import "../styles/Editor.css";

const Editor = () => {
    /*
        Add testing user's uid to Firestore,
        Add testing writing data to Firestore,
        Add Set Button to push data to Firestore
        Updated, I Zhi Chen, 2025/03/22
    */
    const { user } = useAuth();
    const [text, setText] = useState(""); // Store essay text
    const [selectedText, setSelectedText] = useState(""); // Store selected text
    const [paraphrasedText, setParaphrasedText] = useState("");

    // Handle text changes
    const handleChange = (event) => {
        setText(event.target.value);
    };

    // Capture selected text using useEffect
    useEffect(() => {
        const handleSelection = () => {
            const textarea = document.getElementById("editor");
            const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
            setSelectedText(selection.trim()); // Trim to remove accidental spaces
        };

        document.addEventListener("mouseup", handleSelection);
        document.addEventListener("keyup", handleSelection);

        return () => {
            document.removeEventListener("mouseup", handleSelection);
            document.removeEventListener("keyup", handleSelection);
        };
    }, []);

    const handleParaphrase = () => {
        console.log("Selected Text for Paraphrasing:", selectedText);
        setParaphrasedText(`(Paraphrased) ${selectedText}`);
    };
    const handleUpdateFirestore = async () => {
        const essayData = {
            content: "2025/03/25 Quang Firesotre Testing",
            time: "2023-04-30 02:52:16",
            timeZone: "UTC-6",
            totoalWords: "20",
        };
        // Save to Firestore
        const setRef = await addWritingData(user.uid, "2025", "03-25", "Title Name", essayData);
        console.log(setRef);
    };

    return (
        <div className="editor-container">
            <h1 className="editor-title">Write Better</h1>

            {/* Two-column layout */}
            <div className="editor-wrapper">
                {/* Original text area */}
                <textarea
                    id="editor"
                    className="editor-textarea"
                    value={text}
                    onChange={handleChange}
                    placeholder="Start writing your essay here..."
                ></textarea>

                {/* Paraphrased text area */}
                <textarea
                    className="editor-textarea paraphrased-textarea"
                    value={paraphrasedText}
                    readOnly
                    placeholder="Paraphrased text will appear here..."
                ></textarea>
            </div>

            {/* Toolbar */}
            <div className="editor-toolbar">
                <button className="toolbar-button" disabled={!selectedText} onClick={handleParaphrase}>
                    Paraphrase
                </button>
            </div>
            <div className="editor-toolbar">
                <button className="toolbar-button" disabled={false} onClick={handleUpdateFirestore}>
                    Update Essay
                </button>
            </div>
        </div>
    );
};

export default Editor;
