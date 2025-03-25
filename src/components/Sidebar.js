import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const [editors, setEditors] = useState([]);

    // Fetch the user's editors from Firestore on mount
    // useEffect(() => {
    //     if (!user) return;

    //     const fetchEditors = async () => {
    //         const userEditors = await getUserEditors(user);
    //         setEditors(userEditors);
    //     };

    //     fetchEditors();
    // }, [user]);

    // Handle creating a new editor
        // const handleNewEditor = async () => {
        //     if (!user) return;

        //     const newEditorId = Date.now().toString(); // Use timestamp for unique ID
        //     await createNewEditor(user, newEditorId);

        //     // Update local state to reflect new editor
        //     setEditors((prevEditors) => [...prevEditors, { id: newEditorId, content: "" }]);
        //     navigate(`/editor/${newEditorId}`);
        // };

        return (
            <div className="sidebar">
                <button className="sidebar-button new-editor-btn">
                    + New Editor
                </button>
                <div className="editor-list">
                    {/* {editors.map((editor) => (
                    <button key={editor.id} className="sidebar-button" onClick={() => navigate(`/editor/${editor.id}`)}>
                        Editor {editor.id.substring(0, 6)}
                    </button>
                ))} */}
                </div>
            </div>
        );
    };

export default Sidebar;
