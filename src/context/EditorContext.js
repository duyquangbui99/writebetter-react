// src/context/EditorContext.js
import React, { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
    const [refreshFlag, setRefreshFlag] = useState(false);

    const triggerRefresh = () => setRefreshFlag(prev => !prev); // Toggle to force update

    return (
        <EditorContext.Provider value={{ refreshFlag, triggerRefresh }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => useContext(EditorContext);
