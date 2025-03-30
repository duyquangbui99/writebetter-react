// src/components/Editor.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { createNewEditor } from "../services/editorService";
import { useEditor } from "../context/EditorContext"; // ✅
import "../styles/Editor.css";
import editIcon from "../assets/edit-icon.svg";

const Editor = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { year, date, id } = useParams();
    const { triggerRefresh } = useEditor(); // ✅

    const [text, setText] = useState("");
    const [selectedText, setSelectedText] = useState("");
    const [paraphrasedText, setParaphrasedText] = useState("");
    const [loading, setLoading] = useState(true);
    const [editorExists, setEditorExists] = useState(true);
    const [title, setTitle] = useState("Untitled");
    const [isEditingTitle, setIsEditingTitle] = useState(false);


    // ✅ Load editor
    useEffect(() => {
        const fetchEditor = async () => {
            if (!user) return;

            if (!year || !date || !id) {
                setLoading(false);
                setEditorExists(false);
                return;
            }

            try {
                const docRef = doc(db, "writeBetter", user.uid, year, date);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data()[id]) {
                    const editor = docSnap.data()[id];
                    setText(editor.content || "");
                    setTitle(editor.title || "Untitled");
                    setEditorExists(true);
                } else {
                    setEditorExists(false);
                }
            } catch (error) {
                console.error("Error loading editor:", error);
                setEditorExists(false);
            } finally {
                setLoading(false);
            }
        };

        fetchEditor();
    }, [user, year, date, id]);

    const handleChange = async (event) => {
        const newText = event.target.value;
        setText(newText);

        if (user && year && date && id) {
            const docRef = doc(db, "writeBetter", user.uid, year, date);
            await updateDoc(docRef, {
                [`${id}.content`]: newText,
                [`${id}.time`]: new Date().toISOString(),
            });
        }
    };
    // Handle title change and save
    const handleTitleChange = async (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        if (user && year && date && id) {
            const editorDocRef = doc(db, "writeBetter", user.uid, year, date);
            const userDocRef = doc(db, "users", user.uid);

            await updateDoc(editorDocRef, {
                [`${id}.title`]: newTitle,
                [`${id}.time`]: new Date().toISOString(),
            });

            // ✅ Also update editors array inside the user document
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const updatedEditors = (data.editors || []).map((editor) =>
                    editor.id === id && editor.year === year && editor.date === date
                        ? { ...editor, title: newTitle, time: new Date().toISOString() }
                        : editor
                );

                await updateDoc(userDocRef, { editors: updatedEditors });
            }

            triggerRefresh(); // ✅ Let Sidebar know about the change
        }
    };


    // ✅ Manually create new editor if no valid one exists
    const handleCreateNewEditor = async () => {
        if (!user) return;

        const now = new Date();
        const generatedYear = now.getFullYear().toString();
        const generatedDate = `${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
        const generatedId = Date.now().toString();

        const newData = {
            title: "Untitled",
            content: "",
            time: now.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
            totalWords: "0",
        };

        await createNewEditor(user, generatedId, newData);
        triggerRefresh(); // ✅ Sidebar auto refresh
        navigate(`/editor/${generatedYear}/${generatedDate}/${generatedId}`);
    };

    // ✅ Capture selection
    useEffect(() => {
        const handleSelection = () => {
            const textarea = document.getElementById("editor");
            if (!textarea) return;
            const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
            setSelectedText(selection.trim());
        };

        document.addEventListener("mouseup", handleSelection);
        document.addEventListener("keyup", handleSelection);

        return () => {
            document.removeEventListener("mouseup", handleSelection);
            document.removeEventListener("keyup", handleSelection);
        };
    }, []);

    // ✅ UI rendering
    if (loading) return (
        <div className="loading-container">
            <p className="loading-text">Loading Editor...</p>
        </div>
    );

    if (!editorExists) {
        return (
            <div className="editor-empty-state">
                <h2 className="empty-state-title">No editor found</h2>
                <p className="empty-state-message">Click below to create one</p>
                <button className="empty-state-button" onClick={handleCreateNewEditor}>
                    Create New Editor
                </button>
            </div>
        );
    }

    return (
        <div className="editor-container">
            <div className="editor-title-container">
                {isEditingTitle ? (
                    <input
                        className="editor-title-input"
                        value={title}
                        autoFocus
                        onChange={handleTitleChange}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.target.blur();
                        }}
                    />
                ) : (
                    <div className="editor-title-display">
                        <h1>{title || "Untitled"}</h1>
                        <img
                            src={editIcon}
                            alt="Edit"
                            className="edit-icon"
                            onClick={() => setIsEditingTitle(true)}
                        />
                    </div>
                )}
            </div>

            <div className="editor-wrapper">
                <textarea
                    id="editor"
                    className="editor-textarea"
                    value={text}
                    onChange={handleChange}
                    placeholder="Start writing your essay here..."
                ></textarea>

                <textarea
                    className="editor-textarea paraphrased-textarea"
                    value={paraphrasedText}
                    readOnly
                    placeholder="Paraphrased text will appear here..."
                ></textarea>
            </div>

            <div className="editor-toolbar">
                <button className="toolbar-button" disabled={!selectedText} onClick={() => setParaphrasedText(`(Paraphrased) ${selectedText}`)}>
                    Paraphrase
                </button>
            </div>
        </div>
    );
};

export default Editor;
