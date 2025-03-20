import React, { useState, useEffect } from "react";
import "../styles/Editor.css";

const Editor = () => {
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
        </div>
    );
};

export default Editor;
