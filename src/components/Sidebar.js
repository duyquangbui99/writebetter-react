// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { createNewEditor } from "../services/editorService";
import { useEditor } from "../context/EditorContext"; // ✅

import "../styles/Sidebar.css";

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { refreshFlag, triggerRefresh } = useEditor(); // ✅

    const [editors, setEditors] = useState([]);

    // ✅ Fetch user's editors on load and when refreshFlag changes
    useEffect(() => {
        const fetchEditors = async () => {
            if (!user) return;

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const editorList = userSnap.data().editors || [];
                    editorList.sort((a, b) => new Date(b.time) - new Date(a.time));
                    setEditors(editorList);
                }
            } catch (error) {
                console.error("Error loading editors:", error);
            }
        };

        fetchEditors();
    }, [user, refreshFlag]);

    // ✅ Create a new editor
    const handleNewEditor = async () => {
        if (!user) return;

        const now = new Date();
        const year = now.getFullYear().toString();
        const date = `${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
        const titleId = Date.now().toString();

        const newData = {
            title: "Untitled",
            content: "",
            time: now.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
            totalWords: "0",
        };

        await createNewEditor(user, titleId, newData);
        triggerRefresh(); // ✅ Tell sidebar to reload
        navigate(`/editor/${year}/${date}/${titleId}`);
    };

    return (
        <div className="sidebar">
            <button className="sidebar-button new-editor-btn" onClick={handleNewEditor}>
                + New Editor
            </button>

            <div className="editor-list">
                {editors.map((editor) => (
                    <button
                        key={editor.id}
                        className="sidebar-button"
                        onClick={() => navigate(`/editor/${editor.year}/${editor.date}/${editor.id}`)}
                    >
                        {editor.title || "Untitled"}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
