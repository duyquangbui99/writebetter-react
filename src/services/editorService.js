// services/editorService.js

import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Create a new editor + also register it into users/{uid}/editors array
export const createNewEditor = async (user, titleId, data) => {
    const dateObj = new Date();
    const year = dateObj.getFullYear().toString();
    const monthDay = `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;

    try {
        // Create or update the actual editor document
        const editorDocRef = doc(db, "writeBetter", user.uid, year, monthDay);
        const editorDocSnap = await getDoc(editorDocRef);
        const existingData = editorDocSnap.exists() ? editorDocSnap.data() : {};

        await setDoc(editorDocRef, {
            ...existingData,
            [titleId]: data,
        }, { merge: true });

        // ✅ Also update the user's editors array
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            editors: arrayUnion({
                id: titleId,
                year: year,
                date: monthDay,
                title: data.title || "Untitled",
                time: data.time,
            }),
        });

        console.log("Editor created and registered successfully!");

    } catch (error) {
        console.error("Error creating new editor:", error);
    }
};

